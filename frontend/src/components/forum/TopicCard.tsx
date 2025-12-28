import { Card, CardContent, Typography, CardActionArea } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { Topic } from '../../types/models'

interface TopicCardProps {
  topic: Topic
}

export function TopicCard ({ topic }: TopicCardProps) {
  const navigate = useNavigate()

  return (
    <Card sx={{ mb: 2 }}>
      <CardActionArea onClick={() => navigate(`/topics/${topic.id}`)}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {topic.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {topic.description}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            By {topic.user?.username || 'Anonymous'}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            {topic.postsCount || 0} posts • Created {new Date(topic.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

