import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { TopicListPage } from '../pages/TopicListPage'
import { TopicDetailPage } from '../pages/TopicDetailPage'
import { PostDetailPage } from '../pages/PostDetailPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
      {
        path: 'topics',
        element: <TopicListPage />
      },
      {
        path: 'topics/:id',
        element: <TopicDetailPage />
      },
      {
        path: 'posts/:id',
        element: <PostDetailPage />
      }
    ]
  }
])

export function AppRouter () {
  return <RouterProvider router={router} />
}

