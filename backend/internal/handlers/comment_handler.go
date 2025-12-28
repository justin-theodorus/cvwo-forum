package handlers

import (
	"cvwo-forum/backend/internal/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CommentHandler struct {
	forumService *services.ForumService
}

func NewCommentHandler(forumService *services.ForumService) *CommentHandler {
	return &CommentHandler{forumService: forumService}
}

type CreateCommentRequest struct {
	PostID  int    `json:"postId" binding:"required"`
	Content string `json:"content" binding:"required"`
}

func (h *CommentHandler) Create(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	var req CreateCommentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	comment, err := h.forumService.CreateComment(userID.(int), req.PostID, req.Content)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, comment)
}

func (h *CommentHandler) GetByPostID(c *gin.Context) {
	postID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid post id"})
		return
	}

	comments, err := h.forumService.GetCommentsByPostID(postID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, comments)
}

type UpdateCommentRequest struct {
	Content string `json:"content"`
}

func (h *CommentHandler) Update(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid comment id"})
		return
	}

	var req UpdateCommentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	comment, err := h.forumService.UpdateComment(id, userID.(int), req.Content)
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "cannot update this comment"})
		return
	}

	c.JSON(http.StatusOK, comment)
}

func (h *CommentHandler) Delete(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid comment id"})
		return
	}

	err = h.forumService.DeleteComment(id, userID.(int))
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "cannot delete this comment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "comment deleted"})
}
