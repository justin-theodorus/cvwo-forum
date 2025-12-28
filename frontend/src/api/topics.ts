import client from './client'
import type { Topic } from '../types/models'

interface CreateTopicRequest {
  title: string
  description: string
}

export const topicsApi = {
  getAll: async (): Promise<Topic[]> => {
    const response = await client.get('/topics')
    return response.data
  },

  getById: async (id: number): Promise<Topic> => {
    const response = await client.get(`/topics/${id}`)
    return response.data
  },

  create: async (data: CreateTopicRequest): Promise<Topic> => {
    const response = await client.post('/topics', data)
    return response.data
  },

  update: async (id: number, data: Partial<CreateTopicRequest>): Promise<Topic> => {
    const response = await client.put(`/topics/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await client.delete(`/topics/${id}`)
  }
}

