import { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'

interface CommentFormProps {
  onSubmit: (content: string) => void
  isLoading?: boolean
}

export function CommentForm ({ onSubmit, isLoading }: CommentFormProps) {
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(content)
    setContent('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label="Add a comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin="normal"
        multiline
        rows={3}
        required
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{ mt: 1 }}
      >
        {isLoading ? 'Posting...' : 'Post Comment'}
      </Button>
    </Box>
  )
}

