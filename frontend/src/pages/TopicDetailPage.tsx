import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Typography, Box, CircularProgress, Button, IconButton } from '@mui/material'
import { ArrowBack, Edit, Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { PostCard } from '../components/forum/PostCard'
import { PostForm } from '../components/forms/PostForm'
import { TopicEditDialog } from '../components/forms/TopicEditDialog'
import { fetchTopicById } from '../store/topicSlice'
import { fetchPostsByTopicId, createPost } from '../store/postSlice'
import { topicsApi } from '../api/topics'
import type { AppDispatch, RootState } from '../store'

export function TopicDetailPage () {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const currentTopic = useSelector((state: RootState) => state.topics.currentTopic)
  const topicLoading = useSelector((state: RootState) => state.topics.isLoading)
  const posts = useSelector((state: RootState) => state.posts.posts) || []
  const postsLoading = useSelector((state: RootState) => state.posts.isLoading)
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchTopicById(Number(id)))
      dispatch(fetchPostsByTopicId(Number(id)))
    }
  }, [dispatch, id])

  const handleCreatePost = async (title: string, content: string) => {
    if (id) {
      await dispatch(createPost({ topicId: Number(id), title, content }))
    }
  }

  const handleUpdateTopic = async (title: string, description: string) => {
    if (id) {
      try {
        await topicsApi.update(Number(id), { title, description })
        dispatch(fetchTopicById(Number(id)))
      } catch (error) {
        console.error('Failed to update topic:', error)
      }
    }
  }

  const handleDeleteTopic = async () => {
    if (id && window.confirm('Are you sure you want to delete this topic? All posts will also be deleted.')) {
      try {
        await topicsApi.delete(Number(id))
        navigate('/topics')
      } catch (error) {
        console.error('Failed to delete topic:', error)
      }
    }
  }

  if (topicLoading || postsLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    )
  }

  if (!currentTopic) {
    return (
      <Container>
        <Typography>Topic not found</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/topics')}
        >
          Back to Topics
        </Button>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h4">
            {currentTopic.title}
          </Typography>
          {user && currentTopic.userId === user.id && (
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
                onClick={handleDeleteTopic}
                size="small"
              >
                <Delete />
              </IconButton>
            </Box>
          )}
        </Box>
        <Typography variant="body1" color="text.secondary" paragraph>
          {currentTopic.description}
        </Typography>
        {isAuthenticated && (
          <Box sx={{ mt: 3, p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
            <PostForm onSubmit={handleCreatePost} />
          </Box>
        )}
      </Box>
      <TopicEditDialog
        open={editDialogOpen}
        topic={currentTopic}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleUpdateTopic}
      />
      <Box>
        <Typography variant="h5" gutterBottom>
          Posts
        </Typography>
        {posts.length === 0 ? (
          <Typography color="text.secondary">
            No posts yet. Be the first to create one!
          </Typography>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </Box>
    </Container>
  )
}

