# CVWO Forum Application

A full-stack forum web application built as part of the CVWO Winter Assignment 2026. Users can browse topics, create posts, and engage in discussions with a modern, responsive interface.

## Features

- **User Authentication**: Secure JWT-based authentication with registration and login
- **Forum Management**: Create, read, update, and delete topics
- **Discussion Posts**: Create and manage posts within topics
- **Comments System**: Nested commenting system with edit and delete functionality
- **Responsive UI**: Modern interface built with Material UI
- **State Management**: Redux Toolkit for efficient global state management
- **RESTful API**: Clean Go backend with proper separation of concerns

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** - Build tool and dev server
- **Material UI (MUI)** - Component library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **Go 1.24** - Server language
- **Gin** - Web framework
- **PostgreSQL** - Primary database (Supabase)
- **JWT** - Token-based authentication
- **sqlx** - SQL toolkit
- **bcrypt** - Password hashing

### Infrastructure
- **Docker** - Containerization for both frontend and backend
- **Railway** - Backend deployment platform
- **Supabase** - PostgreSQL database hosting
- **Nginx** - Frontend static file serving in production

## Project Structure

```
cvwo-justin/
├── frontend/
│   ├── src/
│   │   ├── api/              # API client and endpoints
│   │   ├── components/       # Reusable React components
│   │   │   ├── forms/        # Form components (login, register, post, comment)
│   │   │   ├── forum/        # Forum-specific components (cards, lists)
│   │   │   └── layout/       # Layout components (navbar, app layout)
│   │   ├── pages/            # Page-level components
│   │   ├── routes/           # React Router configuration
│   │   ├── store/            # Redux store and slices
│   │   ├── theme/            # MUI theme configuration
│   │   └── types/            # TypeScript type definitions
│   ├── Dockerfile            # Frontend container configuration
│   └── package.json          # Frontend dependencies
│
├── backend/
│   ├── cmd/server/           # Application entry point
│   ├── internal/
│   │   ├── config/           # Environment configuration
│   │   ├── db/               # Database connection setup
│   │   ├── handlers/         # HTTP request handlers
│   │   ├── middleware/       # CORS and authentication middleware
│   │   ├── models/           # Data models and structs
│   │   ├── repository/       # Database queries and operations
│   │   ├── router/           # API route definitions
│   │   └── services/         # Business logic layer
│   ├── Dockerfile            # Backend container configuration
│   └── go.mod                # Go dependencies
```

## Environment Variables

### Backend (.env)
Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-secret-key-here
PORT=8080
```

### Frontend (.env)
Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=https://cvwo-forum-production.up.railway.app/api
```

For local development, use:
```env
VITE_API_URL=http://localhost:8080/api
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Go (v1.24 or higher)
- PostgreSQL database
- Docker and Docker Compose (optional, for containerized deployment)

### Local Development

#### 1. Setup Backend
```bash
cd backend
go mod download
go run cmd/server/main.go
```

The backend will start on `http://localhost:8080`

#### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`


## Database

The application uses **PostgreSQL** hosted on **Supabase**.

### Database Schema

- **users**: User accounts with authentication credentials
- **topics**: Forum topics/categories
- **posts**: Discussion posts within topics
- **comments**: User comments on posts (with nested reply support)

### ⚠️ Important Note
The Supabase database may be **paused due to inactivity**. If the application is not working properly or showing database connection errors, this is likely the cause. The database can only be resumed manually. Please contact me through telegram (@aduidk) if you need me to resume the database.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires JWT)

### Topics
- `GET /api/topics` - Get all topics
- `GET /api/topics/:id` - Get topic by ID
- `POST /api/topics` - Create new topic (requires auth)
- `PUT /api/topics/:id` - Update topic (requires auth)
- `DELETE /api/topics/:id` - Delete topic (requires auth)

### Posts
- `GET /api/topics/:topicId/posts` - Get posts in topic
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create new post (requires auth)
- `PUT /api/posts/:id` - Update post (requires auth)
- `DELETE /api/posts/:id` - Delete post (requires auth)

### Comments
- `GET /api/posts/:postId/comments` - Get comments for post
- `POST /api/comments` - Create new comment (requires auth)
- `PUT /api/comments/:id` - Update comment (requires auth)
- `DELETE /api/comments/:id` - Delete comment (requires auth)

## Architecture

The application follows a clean architecture pattern:

### Frontend Architecture
- **Component-based**: Modular, reusable React components
- **State Management**: Redux Toolkit for centralized state
- **API Layer**: Centralized API client with interceptors
- **Type Safety**: Full TypeScript implementation

### Backend Architecture
- **Handler Layer**: HTTP request/response handling
- **Service Layer**: Business logic and validation
- **Repository Layer**: Database operations
- **Middleware**: Authentication and CORS handling
- **Clean separation**: Models, handlers, services, and repositories

## Development Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
```

### Backend
```bash
go run cmd/server/main.go  # Run server
go build -o bin/server cmd/server/main.go  # Build binary
```

## Deployment

- **Backend**: Deployed on Railway at `https://cvwo-forum-production.up.railway.app`
- **Database**: PostgreSQL on Supabase
- **Frontend**: Deployed on Vercel at `https://cvwo-forum-tawny.vercel.app/`


## Author

Built for CVWO Winter Assignment 2026 by Justin Stevenson Theodorus

## AI Use Declaration

AI is used throughout the project to guide me during development. I use AI to give me examples and best practices to implement technologies that I was not familiar with (for example, Redux). This way, I can understand how to use those technologies and implement them. Furthermore, I also use AI to debug code & errors, search through documentations, simplify code, and ensure my code follows best practices.
