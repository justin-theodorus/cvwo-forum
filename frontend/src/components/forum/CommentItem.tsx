import { Box, Typography, Paper, IconButton } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import type { Comment } from '../../types/models'

interface CommentItemProps {
  comment: Comment
  onDelete?: (commentId: number) => void
  onEdit?: (comment: Comment) => void
  currentUserId?: number
}

export function CommentItem ({ comment, onDelete, onEdit, currentUserId }: CommentItemProps) {
  const canEdit = currentUserId && comment.userId === currentUserId

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography variant="body1" gutterBottom sx={{ flex: 1 }}>
          {comment.content}
        </Typography>
        {canEdit && (
          <Box>
            {onEdit && (
              <IconButton
                size="small"
                color="primary"
                onClick={() => onEdit(comment)}
              >
                <Edit fontSize="small" />
              </IconButton>
            )}
            {onDelete && (
              <IconButton
                size="small"
                color="error"
                onClick={() => onDelete(comment.id)}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography variant="caption" color="text.secondary">
          By {comment.user.username}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(comment.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
    </Paper>
  )
}

