# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based club management web application (UNIT club frontend) built with Create React App, TypeScript, Ant Design, and Tailwind CSS. The application manages club members, posts/boards, bowling records, applications, and notifications.

## Development Commands

### Starting Development

```bash
npm start          # Runs on port 80 (requires sudo)
```

### Building and Testing

```bash
npm run build      # Production build
npm test           # Run tests in watch mode
```

### Code Quality

```bash
npm run check-types    # TypeScript type checking (no emit)
npm run check-format   # Check Prettier formatting
npm run check-lint     # ESLint check
npm run format         # Auto-format with Prettier
```

### Pre-commit Hook

The repository has a Husky pre-commit hook that runs:

1. Prettier format check
2. ESLint check
3. TypeScript type check

All checks must pass before committing.

## Architecture

### Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── common/      # Common components (Navbar, Footer, AuthCard, etc.)
│   └── pages/       # Page-specific components organized by route
├── pages/           # Route components (main page files)
├── contexts/        # React Context providers
│   ├── auth/        # Authentication context
│   ├── notification/
│   └── notiNumUnreads/
├── hooks/           # Custom React hooks
│   └── api/         # SWR-based data fetching hooks
├── utils/           # Utility functions
│   ├── common/      # Common utilities (axios, fetcher, etc.)
│   └── users/       # User-specific utilities
├── types/           # TypeScript type definitions
│   └── api/         # API response types
├── constants/       # Application constants (routes, JWT config, etc.)
├── fonts/           # Font files (Pretendard)
└── mockups/         # Mock data
```

### Routing Architecture

The app uses React Router v6 with file-based naming convention in pages/:

- `/` - Home page (index.tsx)
- `/users/me` - Current user profile
- `/users/:id` - User profile by ID
- `/[slug]` - Dynamic board/post lists by slug
- `/[slug]/write` - Create post in board
- `/[slug]/:id` - View individual post
- `/management/*` - Admin/management pages (bowling, members)
- `/applications` - Application management
- `/forms/:id` - Dynamic forms

### Authentication Flow

**JWT-based authentication** with automatic token refresh:

1. **Token Storage**: Access and refresh tokens stored in cookies via `js-cookie`
2. **Axios Interceptors** (src/utils/common/clientAxios.tsx):
   - Request interceptor adds Bearer token to Authorization header
   - Response interceptor handles 401 errors with automatic refresh
   - Queue system prevents multiple simultaneous refresh requests
3. **AuthContext** (src/contexts/auth/AuthProvider.tsx):
   - Provides `user`, `login()`, `logout()`, `isLoggedIn`, `isLoading`
   - Fetches user data on mount if token exists
   - Handles token expiration notifications
4. **withAuth HOC** (src/components/common/withAuth.tsx):
   - Wraps protected routes (e.g., `MyWithAuth`, `ProfileWithAuth`)
   - Redirects to home with error notification if not authenticated

### Data Fetching Pattern

**SWR-based data fetching** with custom hooks:

1. **Global SWR Config** (src/index.tsx):
   - Custom fetcher function using clientAxios
   - `shouldRetryOnError: false`
2. **useAuthSWR Hook** (src/hooks/api/useAuthSWR.ts):
   - Wraps SWR with authentication error handling
   - Auto-redirects on 401/403 with notifications
   - Returns `{ data, isLoading, error, mutate }`
3. **Feature Hooks** (src/hooks/api/):
   - Organized by feature (common, users, [slug], etc.)
   - Example: `usePosts(slug, query)` fetches paginated posts
   - All hooks follow same pattern: call useAuthSWR with API route + query params

### API Integration

**API Routes** defined in src/constants/routes.ts:

- Centralized API route definitions as functions
- Example: `API_ROUTES.posts.bySlug(slug)` returns `/v2/boards/${slug}/posts/`
- All API calls use `clientAxios` instance with base URL from `REACT_APP_API_ENDPOINT` env var

### State Management

1. **React Context** for global state:
   - `AuthContext` - User authentication state
   - `NotificationContext` - Ant Design notification API wrapper
   - `NotiNumUnreadsContext` - Unread notification count
2. **SWR Cache** for server state
3. **URL Search Params** for UI state (pagination, filters)
   - Example in src/pages/[slug]/index.tsx: category and page stored in URL

### Component Patterns

1. **Page Components** (src/pages/):
   - Top-level route components
   - Compose multiple section components
   - Handle data fetching and URL state
2. **Section Components** (src/components/pages/):
   - Organized by page/route (e.g., components/pages/[slug]/)
   - Named with "Section" suffix (e.g., PostListTableSection)
   - Receive data as props from page components
3. **Common Components** (src/components/common/):
   - Reusable across pages (Navbar, Footer, AuthCard, etc.)
   - HOCs like `withAuth` for route protection

### Styling

- **Tailwind CSS** for utility classes
- **Ant Design** components for UI
- Custom font: Pretendard (configured in tailwind.config.js)
- Responsive design with mobile-first approach

## TypeScript Configuration

- Path alias: `src/*` resolves to project root src/
  - Import example: `import useAuth from "src/contexts/auth/useAuth"`
- Strict mode enabled
- Target: ES2020

## Environment Variables

Required environment variable:

- `REACT_APP_API_ENDPOINT` - Backend API base URL

## Important Implementation Notes

1. **Always use path aliases**: Import with `src/` prefix, not relative paths
2. **Protected routes**: Wrap page components with `withAuth(Component, true)` for auth-required pages
3. **API calls**: Use custom hooks from `src/hooks/api/` rather than calling clientAxios directly
4. **Notifications**: Access via `useNotification()` hook, provides Ant Design notification API
5. **Token management**: Handled automatically by clientAxios interceptors, don't manually refresh
6. **Type definitions**: All API response types in `src/types/api/`

## Key Files to Reference

- `src/utils/common/clientAxios.tsx` - Axios configuration with auth interceptors
- `src/contexts/auth/AuthProvider.tsx` - Authentication context implementation
- `src/hooks/api/useAuthSWR.ts` - Base hook for authenticated API calls
- `src/constants/routes.ts` - All API route definitions
- `src/App.tsx` - Main routing and layout structure
