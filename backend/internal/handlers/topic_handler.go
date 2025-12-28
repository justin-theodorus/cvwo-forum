package handlers

import (
	"cvwo-forum/backend/internal/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type TopicHandler struct {
	forumService *services.ForumService
}

func NewTopicHandler(forumService *services.ForumService) *TopicHandler {
	return &TopicHandler{forumService: forumService}
}

type CreateTopicRequest struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
}

func (h *TopicHandler) Create(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	var req CreateTopicRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	topic, err := h.forumService.CreateTopic(userID.(int), req.Title, req.Description)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, topic)
}

func (h *TopicHandler) GetAll(c *gin.Context) {
	topics, err := h.forumService.GetAllTopics()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, topics)
}

func (h *TopicHandler) GetByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid topic id"})
		return
	}

	topic, err := h.forumService.GetTopicByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "topic not found"})
		return
	}

	c.JSON(http.StatusOK, topic)
}

type UpdateTopicRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

func (h *TopicHandler) Update(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid topic id"})
		return
	}

	var req UpdateTopicRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	topic, err := h.forumService.UpdateTopic(id, userID.(int), req.Title, req.Description)
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "cannot update this topic"})
		return
	}

	c.JSON(http.StatusOK, topic)
}

func (h *TopicHandler) Delete(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid topic id"})
		return
	}

	err = h.forumService.DeleteTopic(id, userID.(int))
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "cannot delete this topic"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "topic deleted"})
}
