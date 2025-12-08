package models

import "time"

type Post struct {
  ID        int       `db:"id" json:"id"`
  TopicID   int       `db:"topic_id" json:"topicId"`
  UserID    int       `db:"user_id" json:"userId"`
  Title     string    `db:"title" json:"title"`
  Content   string    `db:"content" json:"content"`
  CreatedAt time.Time `db:"created_at" json:"createdAt"`
  UpdatedAt time.Time `db:"updated_at" json:"updatedAt"`
}

type PostWithUser struct {
  Post
  User *UserResponse `json:"user,omitempty"`
}