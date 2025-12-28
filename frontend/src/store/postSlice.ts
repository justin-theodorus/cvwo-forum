import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { postsApi } from '../api/posts'
import type { Post } from '../types/models'

interface PostState {
  posts: Post[]
  currentPost: Post | null
  isLoading: boolean
  error: string | null
}

const initialState: PostState = {
  posts: [],
  currentPost: null,
  isLoading: false,
  error: null
}

export const fetchPostsByTopicId = createAsyncThunk(
  'posts/fetchByTopicId',
  async (topicId: number) => {
    const posts = await postsApi.getByTopicId(topicId)
    return posts
  }
)

export const fetchPostById = createAsyncThunk(
  'posts/fetchById',
  async (id: number) => {
    const post = await postsApi.getById(id)
    return post
  }
)

export const createPost = createAsyncThunk(
  'posts/create',
  async (data: { topicId: number; title: string; content: string }) => {
    const post = await postsApi.create(data)
    return post
  }
)

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByTopicId.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPostsByTopicId.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.isLoading = false
        state.posts = action.payload || []
      })
      .addCase(fetchPostsByTopicId.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch posts'
      })
      .addCase(fetchPostById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        state.isLoading = false
        state.currentPost = action.payload
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch post'
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload)
      })
  }
})

export const { clearCurrentPost, clearError } = postSlice.actions
export default postSlice.reducer

