import client from './client'
import type { Post } from '../types/models'

interface CreatePostRequest {
  topicId: number
  title: string
  content: string
}

export const postsApi = {
  getByTopicId: async (topicId: number): Promise<Post[]> => {
    const response = await client.get(`/topics/${topicId}/posts`)
    return response.data
  },

  getById: async (id: number): Promise<Post> => {
    const response = await client.get(`/posts/${id}`)
    return response.data
  },

  create: async (data: CreatePostRequest): Promise<Post> => {
    const response = await client.post('/posts', data)
    return response.data
  },

  update: async (id: number, data: Partial<CreatePostRequest>): Promise<Post> => {
    const response = await client.put(`/posts/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await client.delete(`/posts/${id}`)
  }
}

