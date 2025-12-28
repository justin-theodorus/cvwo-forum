import { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'

interface PostFormProps {
  onSubmit: (title: string, content: string) => void
  isLoading?: boolean
}

export function PostForm ({ onSubmit, isLoading }: PostFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(title, content)
    setTitle('')
    setContent('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Create New Post
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin="normal"
        multiline
        rows={6}
        required
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? 'Creating...' : 'Create Post'}
      </Button>
    </Box>
  )
}

