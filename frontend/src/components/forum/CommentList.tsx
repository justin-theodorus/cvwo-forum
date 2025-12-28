import { Box, Typography } from '@mui/material'
import { CommentItem } from './CommentItem'
import type { Comment } from '../../types/models'

interface CommentListProps {
  comments: Comment[]
  onDelete?: (commentId: number) => void
  onEdit?: (comment: Comment) => void
  currentUserId?: number
}

export function CommentList ({ comments, onDelete, onEdit, currentUserId }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No comments yet. Be the first to comment!
      </Typography>
    )
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Comments ({comments.length})
      </Typography>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDelete={onDelete}
          onEdit={onEdit}
          currentUserId={currentUserId}
        />
      ))}
    </Box>
  )
}

