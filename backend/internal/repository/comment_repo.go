package repository

import (
	"cvwo-forum/backend/internal/models"

	"github.com/jmoiron/sqlx"
)

type CommentRepository struct {
	db *sqlx.DB
}

func NewCommentRepository(db *sqlx.DB) *CommentRepository {
	return &CommentRepository{db: db}
}

func (r *CommentRepository) Create(comment *models.Comment) error {
	query := `
    INSERT INTO comments (post_id, user_id, content, created_at, updated_at)
    VALUES ($1, $2, $3, NOW(), NOW())
    RETURNING id, created_at, updated_at`
	return r.db.QueryRow(query, comment.PostID, comment.UserID, comment.Content).Scan(&comment.ID, &comment.CreatedAt, &comment.UpdatedAt)
}

func (r *CommentRepository) GetByPostID(postID int) ([]models.Comment, error) {
	var comments []models.Comment
	query := `
    SELECT id, post_id, user_id, content, created_at, updated_at
    FROM comments
    WHERE post_id = $1
    ORDER BY created_at ASC`
	err := r.db.Select(&comments, query, postID)
	return comments, err
}

func (r *CommentRepository) Update(comment *models.Comment) error {
	query := `
    UPDATE comments
    SET content = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING updated_at`
	return r.db.QueryRow(query, comment.Content, comment.ID).Scan(&comment.UpdatedAt)
}

func (r *CommentRepository) Delete(id int) error {
	query := `DELETE FROM comments WHERE id = $1`
	_, err := r.db.Exec(query, id)
	return err
}
