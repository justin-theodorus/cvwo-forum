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

func (s *ForumService) GetAllTopics() ([]models.TopicWithUser, error) {
	return s.topicRepo.GetAll()
}

func (s *ForumService) GetTopicByID(id int) (*models.Topic, error) {
	return s.topicRepo.GetByID(id)
}

func (s *ForumService) UpdateTopic(topicID, userID int, title, description string) (*models.Topic, error) {
	topic, err := s.topicRepo.GetByID(topicID)
	if err != nil {
		return nil, err
	}
	if topic.UserID != userID {
		return nil, repository.ErrUnauthorized
	}
	topic.Title = title
	topic.Description = description
	err = s.topicRepo.Update(topic)
	return topic, err
}

func (s *ForumService) DeleteTopic(topicID, userID int) error {
	topic, err := s.topicRepo.GetByID(topicID)
	if err != nil {
		return err
	}
	if topic.UserID != userID {
		return repository.ErrUnauthorized
	}
	return s.topicRepo.Delete(topicID)
}

// post
func (s *ForumService) CreatePost(userID, topicID int, title, content string) (*models.PostWithUser, error) {
	post := &models.Post{
		TopicID: topicID,
		UserID:  userID,
		Title:   title,
		Content: content,
	}
	err := s.postRepo.Create(post)
	if err != nil {
		return nil, err
	}
	// Fetch the post with user info
	return s.postRepo.GetByID(post.ID)
}

func (s *ForumService) GetPostsByTopicID(topicID int) ([]models.PostWithUser, error) {
	return s.postRepo.GetByTopicID(topicID)
}

func (s *ForumService) GetPostByID(id int) (*models.PostWithUser, error) {
	return s.postRepo.GetByID(id)
}

func (s *ForumService) UpdatePost(postID, userID int, title, content string) (*models.PostWithUser, error) {
	post, err := s.postRepo.GetByID(postID)
	if err != nil {
		return nil, err
	}
	if post.UserID != userID {
		return nil, repository.ErrUnauthorized
	}
	post.Title = title
	post.Content = content
	err = s.postRepo.Update(&post.Post)
	if err != nil {
		return nil, err
	}
	// Fetch updated post with user info
	return s.postRepo.GetByID(postID)
}

func (s *ForumService) DeletePost(postID, userID int) error {
	post, err := s.postRepo.GetByID(postID)
	if err != nil {
		return err
	}
	if post.UserID != userID {
		return repository.ErrUnauthorized
	}
	return s.postRepo.Delete(postID)
}

// comment
func (s *ForumService) CreateComment(userID, postID int, content string) (*models.CommentWithUser, error) {
	comment := &models.Comment{
		PostID:  postID,
		UserID:  userID,
		Content: content,
	}
	err := s.commentRepo.Create(comment)
	if err != nil {
		return nil, err
	}
	// Fetch the comment with user info
	return s.commentRepo.GetByIDWithUser(comment.ID)
}

func (s *ForumService) GetCommentsByPostID(postID int) ([]models.CommentWithUser, error) {
	return s.commentRepo.GetByPostID(postID)
}

func (s *ForumService) UpdateComment(commentID, userID int, content string) (*models.CommentWithUser, error) {
	comment, err := s.commentRepo.GetByID(commentID)
	if err != nil {
		return nil, err
	}
	if comment.UserID != userID {
		return nil, repository.ErrUnauthorized
	}
	comment.Content = content
	err = s.commentRepo.Update(comment)
	if err != nil {
		return nil, err
	}
	// Fetch updated comment with user info
	return s.commentRepo.GetByIDWithUser(commentID)
}

func (s *ForumService) DeleteComment(commentID, userID int) error {
	comment, err := s.commentRepo.GetByID(commentID)
	if err != nil {
		return err
	}
	if comment.UserID != userID {
		return repository.ErrUnauthorized
	}
	return s.commentRepo.Delete(commentID)
}
