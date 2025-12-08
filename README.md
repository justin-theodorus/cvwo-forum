# Project Skeleton Plan

## Frontend
- /src/api = handle API calls to the backend
- /src/components = components/parts for forms and forums (for example, login form, post card, etc)
- /src/pages = website pages (home page, forum page, login page, etc)
- src/theme = theme from MUI
- /src/store = for redux 
- /src/routes = web page routes (/login, /topics, etc)
- /src/types = type delclarations (users, topic, post, etc)

.env contains API_URL

## Backend
- /internal/config = load env variables
- /internal/db = connect to db (and handle error cases)
- /internal/models = type interface declarations (user, post, comment, etc)
- /internal/repository = contain functions with SQL queries to modify the database (create users, get topis, etc)
- /internal/services = services that use functions in repository to handle auth and form logic
- /internal/handlers = higher level than services, handle http requests for auth, topic, post, comment
- /internal/router = API routes
- /internal/middleware = CORS and auth (for JWT tokens)

.env contains = databaseURL, JWTSecret, and Port (8080 default)