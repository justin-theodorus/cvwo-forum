package repository

import (
	"cvwo-forum/backend/internal/models"

	"github.com/jmoiron/sqlx"
)

type PostRepository struct {
	db *sqlx.DB
}

func NewPostRepository(db *sqlx.DB) *PostRepository {
	return &PostRepository{db: db}
}

func (r *PostRepository) Create(post *models.Post) error {
	query := `
    INSERT INTO posts (topic_id, user_id, title, content, created_at, updated_at)
    VALUES ($1, $2, $3, $4, NOW(), NOW())
    RETURNING id, created_at, updated_at`
	return r.db.QueryRow(query, post.TopicID, post.UserID, post.Title, post.Content).Scan(&post.ID, &post.CreatedAt, &post.UpdatedAt)
}

func (r *PostRepository) GetByTopicID(topicID int) ([]models.Post, error) {
	var posts []models.Post
	query := `
    SELECT id, topic_id, user_id, title, content, created_at, updated_at
    FROM posts
    WHERE topic_id = $1
    ORDER BY created_at DESC`
	err := r.db.Select(&posts, query, topicID)
	return posts, err
}

func (r *PostRepository) GetByID(id int) (*models.Post, error) {
	var post models.Post
	query := `
    SELECT id, topic_id, user_id, title, content, created_at, updated_at
    FROM posts
    WHERE id = $1`
	err := r.db.Get(&post, query, id)
	return &post, err
}

func (r *PostRepository) Update(post *models.Post) error {
	query := `
    UPDATE posts
    SET title = $1, content = $2, updated_at = NOW()
    WHERE id = $3
    RETURNING updated_at`
	return r.db.QueryRow(query, post.Title, post.Content, post.ID).Scan(&post.UpdatedAt)
}

func (r *PostRepository) Delete(id int) error {
	query := `DELETE FROM posts WHERE id = $1`
	_, err := r.db.Exec(query, id)
	return err
}
