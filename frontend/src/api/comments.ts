import client from './client'
import type { Comment } from '../types/models'

interface CreateCommentRequest {
  postId: number
  content: string
}

export const commentsApi = {
  getByPostId: async (postId: number): Promise<Comment[]> => {
    const response = await client.get(`/posts/${postId}/comments`)
    return response.data
  },

  create: async (data: CreateCommentRequest): Promise<Comment> => {
    const response = await client.post('/comments', data)
    return response.data
  },

  update: async (id: number, content: string): Promise<Comment> => {
    const response = await client.put(`/comments/${id}`, { content })
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await client.delete(`/comments/${id}`)
  }
}

