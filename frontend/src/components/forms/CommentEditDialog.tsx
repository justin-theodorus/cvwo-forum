import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'
import type { Comment } from '../../types/models'

interface CommentEditDialogProps {
  open: boolean
  comment: Comment | null
  onClose: () => void
  onSave: (content: string) => Promise<void>
}

export function CommentEditDialog ({ open, comment, onClose, onSave }: CommentEditDialogProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (comment) {
      setContent(comment.content)
    }
  }, [comment])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      await onSave(content)
      onClose()
    } catch (error) {
      console.error('Failed to update comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            fullWidth
            multiline
            rows={4}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

