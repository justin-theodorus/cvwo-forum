import { useEffect } from 'react'
import { Container, Typography, Box, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { TopicCard } from '../components/forum/TopicCard'
import { TopicForm } from '../components/forms/TopicForm'
import { fetchTopics, createTopic } from '../store/topicSlice'
import type { AppDispatch, RootState } from '../store'

export function TopicListPage () {
  const dispatch = useDispatch<AppDispatch>()
  const topics = useSelector((state: RootState) => state.topics.topics) || []
  const isLoading = useSelector((state: RootState) => state.topics.isLoading)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(fetchTopics())
  }, [dispatch])

  const handleCreateTopic = async (title: string, description: string) => {
    await dispatch(createTopic({ title, description }))
  }

  if (isLoading && topics.length === 0) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Discussion Topics
        </Typography>
        {isAuthenticated && (
          <Box sx={{ mt: 3, p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
            <TopicForm onSubmit={handleCreateTopic} />
          </Box>
        )}
      </Box>
      <Box>
        {topics.length === 0 ? (
          <Typography color="text.secondary">
            No topics yet. Be the first to create one!
          </Typography>
        ) : (
          topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))
        )}
      </Box>
    </Container>
  )
}

