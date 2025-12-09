package main

import (
	"cvwo-forum/backend/internal/config"
	"cvwo-forum/backend/internal/db"
	"cvwo-forum/backend/internal/repository"
	"cvwo-forum/backend/internal/router"
	"cvwo-forum/backend/internal/services"
	"log"

	"github.com/jmoiron/sqlx"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatal("Failed to load config:", err)
	}

	// database
	var database *sqlx.DB
	if cfg.DatabaseURL != "" {
		database, err = db.Connect(cfg.DatabaseURL)
		if err != nil {
			log.Println("Could not connect to database:", err)
			log.Println("Server will start but database operations will fail")
		}
	} else {
		log.Println("DATABASE_URL not set. Server will start but database operations will fail")
	}

	userRepo := repository.NewUserRepository(database)
	topicRepo := repository.NewTopicRepository(database)
	postRepo := repository.NewPostRepository(database)
	commentRepo := repository.NewCommentRepository(database)
	authService := services.NewAuthService(userRepo, cfg.JWTSecret)
	forumService := services.NewForumService(topicRepo, postRepo, commentRepo, userRepo)
	r := router.SetupRouter(authService, forumService)

	log.Printf("Starting server on port %s", cfg.Port)
	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
