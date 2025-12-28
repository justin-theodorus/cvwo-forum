package repository

import (
	"cvwo-forum/backend/internal/models"
	"errors"

	"github.com/jmoiron/sqlx"
)

var ErrUnauthorized = errors.New("unauthorized")

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

func (r *CommentRepository) GetByPostID(postID int) ([]models.CommentWithUser, error) {
	comments := make([]models.CommentWithUser, 0)
	query := `
    SELECT c.id, c.post_id, c.user_id, c.content, c.created_at, c.updated_at,
           u.id as "user.id", u.username as "user.username", u.email as "user.email", u.created_at as "user.created_at"
    FROM comments c
    LEFT JOIN users u ON c.user_id = u.id
    WHERE c.post_id = $1
    ORDER BY c.created_at ASC`
	err := r.db.Select(&comments, query, postID)
	return comments, err
}

func (r *CommentRepository) GetByID(id int) (*models.Comment, error) {
	var comment models.Comment
	query := `
    SELECT id, post_id, user_id, content, created_at, updated_at
    FROM comments
    WHERE id = $1`
	err := r.db.Get(&comment, query, id)
	return &comment, err
}

func (r *CommentRepository) GetByIDWithUser(id int) (*models.CommentWithUser, error) {
	var comment models.CommentWithUser
	query := `
    SELECT c.id, c.post_id, c.user_id, c.content, c.created_at, c.updated_at,
           u.id as "user.id", u.username as "user.username", u.email as "user.email", u.created_at as "user.created_at"
    FROM comments c
    LEFT JOIN users u ON c.user_id = u.id
    WHERE c.id = $1`
	err := r.db.Get(&comment, query, id)
	return &comment, err
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
