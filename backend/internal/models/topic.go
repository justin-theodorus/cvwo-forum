package models

import "time"

type Topic struct {
	ID          int       `db:"id" json:"id"`
	Title       string    `db:"title" json:"title"`
	Description string    `db:"description" json:"description"`
	UserID      int       `db:"user_id" json:"userId"`
	CreatedAt   time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt   time.Time `db:"updated_at" json:"updatedAt"`
}

type TopicWithUser struct {
	Topic
	User *UserResponse `json:"user,omitempty"`
}
