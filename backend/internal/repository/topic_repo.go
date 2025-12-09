package repository

import (
  "cvwo-forum/backend/internal/models"
  "github.com/jmoiron/sqlx"
)

type TopicRepository struct {
  db *sqlx.DB
}
func NewTopicRepository(db *sqlx.DB) *TopicRepository {
  return &TopicRepository{db: db}
}

func (r *TopicRepository) Create(topic *models.Topic) error {
  query := `
    INSERT INTO topics (title, description, user_id, created_at, updated_at)
    VALUES ($1, $2, $3, NOW(), NOW())
    RETURNING id, created_at, updated_at `
  
  return r.db.QueryRow(query, topic.Title, topic.Description, topic.UserID).Scan(&topic.ID, &topic.CreatedAt, &topic.UpdatedAt)
}

func (r *TopicRepository) GetAll() ([]models.Topic, error) {
  var topics []models.Topic
  query := `
    SELECT id, title, description, user_id, created_at, updated_at
    FROM topics
    ORDER BY created_at DESC `
  err := r.db.Select(&topics, query)
  return topics, err
}

func (r *TopicRepository) GetByID(id int) (*models.Topic, error) {
  var topic models.Topic
  query := `
    SELECT id, title, description, user_id, created_at, updated_at
    FROM topics
    WHERE id = $1 `
  err := r.db.Get(&topic, query, id)
  return &topic, err
}

func (r *TopicRepository) Update(topic *models.Topic) error {
  query := `
    UPDATE topics
    SET title = $1, description = $2, updated_at = NOW()
    WHERE id = $3
    RETURNING updated_at `
  return r.db.QueryRow(query, topic.Title, topic.Description, topic.ID).Scan(&topic.UpdatedAt)
}

func (r *TopicRepository) Delete(id int) error {
  query := `DELETE FROM topics WHERE id = $1`
  _, err := r.db.Exec(query, id)
  return err
}

