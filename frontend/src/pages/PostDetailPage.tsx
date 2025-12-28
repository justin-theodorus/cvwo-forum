import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Typography, Box, CircularProgress, Paper, Button, IconButton } from '@mui/material'
import { ArrowBack, Delete, Edit } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { CommentList } from '../components/forum/CommentList'
import { CommentForm } from '../components/forms/CommentForm'
import { PostEditDialog } from '../components/forms/PostEditDialog'
import { CommentEditDialog } from '../components/forms/CommentEditDialog'
import { postsApi } from '../api/posts'
import { commentsApi } from '../api/comments'
import type { RootState } from '../store'
import type { Post, Comment } from '../types/models'

export function PostDetailPage () {
  const { id } = useParams<{ id: string }>() // id from URL
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editDialogOpen, setEditDialogOpen] = useState(false) // dialog to edit post
  const [commentEditDialogOpen, setCommentEditDialogOpen] = useState(false) // dialog to edit comment
  const [editingComment, setEditingComment] = useState<Comment | null>(null) // comment data being edited

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        setIsLoading(true)
        try {
          const [postData, commentsData] = await Promise.all([
            postsApi.getById(Number(id)),
            commentsApi.getByPostId(Number(id))
          ])
          setPost(postData)
          setComments(commentsData)
        } catch (error) {
          console.error('Failed to load post:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    loadData()
  }, [id])

  const handleCreateComment = async (content: string) => {
    if (id) {
      try {
        const newComment = await commentsApi.create({ postId: Number(id), content })
        setComments([...comments, newComment])
      } catch (error) {
        console.error('Failed to create comment:', error)
      }
    }
  }

  const handleDeletePost = async () => {
    if (id && post && window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsApi.delete(Number(id))
        navigate(`/topics/${post.topicId}`)
      } catch (error) {
        console.error('Failed to delete post:', error)
      }
    }
  }

  const handleUpdatePost = async (title: string, content: string) => {
    if (id) {
      try {
        const updatedPost = await postsApi.update(Number(id), { title, content })
        setPost(updatedPost)
      } catch (error) {
        console.error('Failed to update post:', error)
      }
    }
  }

  const handleEditComment = (comment: Comment) => {
    setEditingComment(comment)
    setCommentEditDialogOpen(true)
  }

  const handleUpdateComment = async (content: string) => {
    if (editingComment) {
      try {
        const updatedComment = await commentsApi.update(editingComment.id, content)
        setComments(comments.map(c => c.id === updatedComment.id ? updatedComment : c))
      } catch (error) {
        console.error('Failed to update comment:', error)
      }
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await commentsApi.delete(commentId)
        setComments(comments.filter(c => c.id !== commentId))
      } catch (error) {
        console.error('Failed to delete comment:', error)
      }
    }
  }

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    )
  }

  if (!post) {
    return (
      <Container>
        <Typography>Post not found</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(`/topics/${post.topicId}`)}
        >
          Back to Topic
        </Button>
      </Box>
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>
          {user && post.userId === user.id && (
            <Box>
              <IconButton
                color="primary"
                onClick={() => setEditDialogOpen(true)}
                size="small"
              >
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={handleDeletePost}
                size="small"
              >
                <Delete />
              </IconButton>
            </Box>
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          By {post.user.username} • {new Date(post.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
          {post.content}
        </Typography>
      </Paper>

      <PostEditDialog
        open={editDialogOpen}
        post={post}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleUpdatePost}
      />

      <Box>
        {isAuthenticated && (
          <CommentForm onSubmit={handleCreateComment} />
        )}
        <CommentList
          comments={comments}
          onDelete={handleDeleteComment}
          onEdit={handleEditComment}
          currentUserId={user?.id}
        />
      </Box>

      <CommentEditDialog
        open={commentEditDialogOpen}
        comment={editingComment}
        onClose={() => {
          setCommentEditDialogOpen(false)
          setEditingComment(null)
        }}
        onSave={handleUpdateComment}
      />
    </Container>
  )
}

