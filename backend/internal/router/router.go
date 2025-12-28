package router

import (
	"cvwo-forum/backend/internal/handlers"
	"cvwo-forum/backend/internal/middleware"
	"cvwo-forum/backend/internal/services"

	"github.com/gin-gonic/gin"
)

func SetupRouter(
	authService *services.AuthService,
	forumService *services.ForumService,
) *gin.Engine {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())

	// health
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	authHandler := handlers.NewAuthHandler(authService)
	topicHandler := handlers.NewTopicHandler(forumService)
	postHandler := handlers.NewPostHandler(forumService)
	commentHandler := handlers.NewCommentHandler(forumService)
	// API routes
	api := r.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/login", authHandler.Login)
			auth.GET("/me", middleware.AuthMiddleware(authService), authHandler.GetCurrentUser)
		}

		topics := api.Group("/topics")
		{
			topics.GET("", topicHandler.GetAll)
			topics.GET("/:id", topicHandler.GetByID)
			topics.GET("/:id/posts", postHandler.GetByTopicID)

			topics.POST("", middleware.AuthMiddleware(authService), topicHandler.Create)
			topics.PUT("/:id", middleware.AuthMiddleware(authService), topicHandler.Update)
			topics.DELETE("/:id", middleware.AuthMiddleware(authService), topicHandler.Delete)
		}

		posts := api.Group("/posts")
		{
			posts.GET("/:id", postHandler.GetByID)
			posts.GET("/:id/comments", commentHandler.GetByPostID)

			posts.POST("", middleware.AuthMiddleware(authService), postHandler.Create)
			posts.PUT("/:id", middleware.AuthMiddleware(authService), postHandler.Update)
			posts.DELETE("/:id", middleware.AuthMiddleware(authService), postHandler.Delete)
		}

		comments := api.Group("/comments")
		{
			comments.POST("", middleware.AuthMiddleware(authService), commentHandler.Create)
			comments.PUT("/:id", middleware.AuthMiddleware(authService), commentHandler.Update)
			comments.DELETE("/:id", middleware.AuthMiddleware(authService), commentHandler.Delete)
		}
	}

	return r
}
