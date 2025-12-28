import { Card, CardContent, Typography, CardActionArea, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { Post } from '../../types/models'

interface PostCardProps {
  post: Post
}

export function PostCard ({ post }: PostCardProps) {
  const navigate = useNavigate()

  return (
    <Card sx={{ mb: 2 }}>
      <CardActionArea onClick={() => navigate(`/posts/${post.id}`)}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {post.content}
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">
              By {post.user?.username || 'Anonymous'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {post.commentsCount || 0} comments • {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

