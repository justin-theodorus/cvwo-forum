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
		}

		topics := api.Group("/topics")
		{
			topics.GET("", topicHandler.GetAll)
			topics.GET("/:id", topicHandler.GetByID)
			topics.GET("/:id/posts", postHandler.GetByTopicID)

			topics.POST("", middleware.AuthMiddleware(authService), topicHandler.Create)
		}

		posts := api.Group("/posts")
		{
			posts.GET("/:id", postHandler.GetByID)
			posts.GET("/:id/comments", commentHandler.GetByPostID)

			posts.POST("", middleware.AuthMiddleware(authService), postHandler.Create)
		}

		comments := api.Group("/comments")
		{
			comments.POST("", middleware.AuthMiddleware(authService), commentHandler.Create)
		}
	}

	return r
}
