export interface User {
  id: number
  username: string
  email: string
  createdAt: string
}
export interface Topic {
  id: number
  title: string
  description: string
  userId: number
  user: User
  createdAt: string
  updatedAt: string
  postsCount?: number
}
export interface Post {
  id: number
  topicId: number
  userId: number
  title: string
  content: string
  user: User
  createdAt: string
  updatedAt: string
  commentsCount?: number
}
export interface Comment {
  id: number
  postId: number
  userId: number
  content: string
  user: User
  createdAt: string
  updatedAt: string
}