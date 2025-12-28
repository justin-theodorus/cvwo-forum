package models

import "time"

type Comment struct {
	ID        int       `db:"id" json:"id"`
	PostID    int       `db:"post_id" json:"postId"`
	UserID    int       `db:"user_id" json:"userId"`
	Content   string    `db:"content" json:"content"`
	CreatedAt time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt time.Time `db:"updated_at" json:"updatedAt"`
}

type CommentWithUser struct {
	Comment
	User *UserResponse `db:"user" json:"user,omitempty"`
}
