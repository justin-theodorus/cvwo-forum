import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { topicsApi } from '../api/topics'
import type { Topic } from '../types/models'

interface TopicState {
  topics: Topic[]
  currentTopic: Topic | null
  isLoading: boolean
  error: string | null
}

const initialState: TopicState = {
  topics: [],
  currentTopic: null,
  isLoading: false,
  error: null
}

export const fetchTopics = createAsyncThunk(
  'topics/fetchAll',
  async () => {
    const topics = await topicsApi.getAll()
    return topics
  }
)

export const fetchTopicById = createAsyncThunk(
  'topics/fetchById',
  async (id: number) => {
    const topic = await topicsApi.getById(id)
    return topic
  }
)

export const createTopic = createAsyncThunk(
  'topics/create',
  async (data: { title: string; description: string }) => {
    const topic = await topicsApi.create(data)
    return topic
  }
)

const topicSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    clearCurrentTopic: (state) => {
      state.currentTopic = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTopics.fulfilled, (state, action: PayloadAction<Topic[]>) => {
        state.isLoading = false
        state.topics = action.payload || []
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch topics'
      })
      .addCase(fetchTopicById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTopicById.fulfilled, (state, action: PayloadAction<Topic>) => {
        state.isLoading = false
        state.currentTopic = action.payload
      })
      .addCase(fetchTopicById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch topic'
      })
      .addCase(createTopic.fulfilled, (state, action: PayloadAction<Topic>) => {
        state.topics.push(action.payload)
      })
  }
})

export const { clearCurrentTopic, clearError } = topicSlice.actions
export default topicSlice.reducer

