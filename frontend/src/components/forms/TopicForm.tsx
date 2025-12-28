import { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'

interface TopicFormProps {
  onSubmit: (title: string, description: string) => void
  isLoading?: boolean
}

export function TopicForm ({ onSubmit, isLoading }: TopicFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(title, description)
    setTitle('')
    setDescription('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Create New Topic
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
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        multiline
        rows={3}
        required
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? 'Creating...' : 'Create Topic'}
      </Button>
    </Box>
  )
}

