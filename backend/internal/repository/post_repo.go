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

func (r *PostRepository) GetByTopicID(topicID int) ([]models.PostWithUser, error) {
	posts := make([]models.PostWithUser, 0)
	query := `
    SELECT p.id, p.topic_id, p.user_id, p.title, p.content, p.created_at, p.updated_at,
           u.id as "user.id", u.username as "user.username", u.email as "user.email", u.created_at as "user.created_at",
           COUNT(c.id) as comments_count
    FROM posts p
    LEFT JOIN users u ON p.user_id = u.id
    LEFT JOIN comments c ON p.id = c.post_id
    WHERE p.topic_id = $1
    GROUP BY p.id, p.topic_id, p.user_id, p.title, p.content, p.created_at, p.updated_at,
             u.id, u.username, u.email, u.created_at
    ORDER BY p.created_at DESC`
	err := r.db.Select(&posts, query, topicID)
	return posts, err
}

func (r *PostRepository) GetByID(id int) (*models.PostWithUser, error) {
	var post models.PostWithUser
	query := `
    SELECT p.id, p.topic_id, p.user_id, p.title, p.content, p.created_at, p.updated_at,
           u.id as "user.id", u.username as "user.username", u.email as "user.email", u.created_at as "user.created_at",
           COUNT(c.id) as comments_count
    FROM posts p
    LEFT JOIN users u ON p.user_id = u.id
    LEFT JOIN comments c ON p.id = c.post_id
    WHERE p.id = $1
    GROUP BY p.id, p.topic_id, p.user_id, p.title, p.content, p.created_at, p.updated_at,
             u.id, u.username, u.email, u.created_at`
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
