package repository

import (
	"cvwo-forum/backend/internal/models"
	"github.com/jmoiron/sqlx"
)

type UserRepository struct {
	db *sqlx.DB
}
// new user
func NewUserRepository(db *sqlx.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(user *models.User) error {
	query := `
		INSERT INTO users (username, email, password, created_at)
		VALUES ($1, $2, $3, NOW())
		RETURNING id, created_at `
	return r.db.QueryRow(query, user.Username, user.Email, user.Password).Scan(&user.ID, &user.CreatedAt)
}
func (r *UserRepository) GetByUsername(username string) (*models.User, error) {
	var user models.User
	query := `SELECT id, username, email, password, created_at FROM users WHERE username = $1`
	err := r.db.Get(&user, query, username)
	return &user, err
}

func (r *UserRepository) GetByID(id int) (*models.User, error) {
	var user models.User
	query := `SELECT id, username, email, password, created_at FROM users WHERE id = $1`
	err := r.db.Get(&user, query, id)
	return &user, err
}

func (r *UserRepository) GetByEmail(email string) (*models.User, error) {
	var user models.User
	query := `SELECT id, username, email, password, created_at FROM users WHERE email = $1`
	err := r.db.Get(&user, query, email)
	return &user, err
}
