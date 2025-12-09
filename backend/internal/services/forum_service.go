package services

import (
	"cvwo-forum/backend/internal/models"
	"cvwo-forum/backend/internal/repository"
)

type ForumService struct {
	topicRepo   *repository.TopicRepository
	postRepo    *repository.PostRepository
	commentRepo *repository.CommentRepository
	userRepo    *repository.UserRepository
}

func NewForumService(
	topicRepo *repository.TopicRepository,
	postRepo *repository.PostRepository,
	commentRepo *repository.CommentRepository,
	userRepo *repository.UserRepository,
) *ForumService {
	return &ForumService{
		topicRepo:   topicRepo,
		postRepo:    postRepo,
		commentRepo: commentRepo,
		userRepo:    userRepo,
	}
}

func (s *ForumService) CreateTopic(userID int, title, description string) (*models.Topic, error) {
	topic := &models.Topic{
		Title:       title,
		Description: description,
		UserID:      userID,
	}
	err := s.topicRepo.Create(topic)
	return topic, err
}

func (s *ForumService) GetAllTopics() ([]models.Topic, error) {
	return s.topicRepo.GetAll()
}

func (s *ForumService) GetTopicByID(id int) (*models.Topic, error) {
	return s.topicRepo.GetByID(id)
}

// post
func (s *ForumService) CreatePost(userID, topicID int, title, content string) (*models.Post, error) {
	post := &models.Post{
		TopicID: topicID,
		UserID:  userID,
		Title:   title,
		Content: content,
	}
	err := s.postRepo.Create(post)
	return post, err
}

func (s *ForumService) GetPostsByTopicID(topicID int) ([]models.Post, error) {
	return s.postRepo.GetByTopicID(topicID)
}

func (s *ForumService) GetPostByID(id int) (*models.Post, error) {
	return s.postRepo.GetByID(id)
}

// comment
func (s *ForumService) CreateComment(userID, postID int, content string) (*models.Comment, error) {
	comment := &models.Comment{
		PostID:  postID,
		UserID:  userID,
		Content: content,
	}
	err := s.commentRepo.Create(comment)
	return comment, err
}

func (s *ForumService) GetCommentsByPostID(postID int) ([]models.Comment, error) {
	return s.commentRepo.GetByPostID(postID)
}
