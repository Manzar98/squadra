# Professional Supabase Middleware Implementation

This guide explains the professional middleware setup implemented in your project for handling authentication and route protection.

## Architecture Overview

The middleware system consists of several key components:

### 1. Next.js Middleware (`middleware.ts`)
- **Location**: Project root
- **Purpose**: Intercepts all requests and handles authentication checks
- **Features**:
  - Route protection for `/dashboard` and sub-routes
  - Automatic redirects for authenticated/unauthenticated users
  - Session refresh handling
  - Proper cookie management

### 2. Supabase Client Configurations

#### Browser Client (`src/lib/supabase/auth/client.ts`)
- For client-side operations
- Used in React components and client-side authentication

#### Server Client (`src/lib/supabase/auth/server.ts`)
- For server-side operations (Server Components, API routes)
- Uses anon key (not service role key) for security

#### Middleware Client (`src/lib/supabase/auth/middleware.ts`)
- Specialized for Next.js middleware
- Returns both Supabase client and NextResponse
- Handles cookie management for middleware context

### 3. Authentication Utilities (`src/lib/supabase/auth/utils.ts`)
- `getUser()`: Get current user safely
- `requireAuth()`: Redirect to login if not authenticated
- `requireNoAuth()`: Redirect to dashboard if already authenticated

## Route Protection Strategy

### Protected Routes
- `/dashboard/*` - Requires authentication
- Automatically redirects to `/login` with `redirectedFrom` parameter

### Auth Routes
- `/login`, `/signup`, `/reset-password` - Should not be accessible when authenticated
- Automatically redirects to `/dashboard` if user is already logged in

### Public Routes
- All other routes remain accessible without authentication

## Layout-Based Protection

### Dashboard Layout (`src/app/dashboard/layout.tsx`)
```typescript
import { requireAuth } from '@/lib/supabase/auth/utils'

export default async function DashboardLayout({ children }) {
  await requireAuth() // Redirects to login if not authenticated
  return <>{children}</>
}
```

### Auth Layout (`src/app/(auth)/layout.tsx`)
```typescript
import { requireNoAuth } from '@/lib/supabase/auth/utils'

export default async function AuthLayout({ children }) {
  await requireNoAuth() // Redirects to dashboard if already authenticated
  return <>{children}</>
}
```

## Key Features

### 1. Automatic Redirects
- Unauthenticated users accessing protected routes → `/login?redirectedFrom=/dashboard/settings`
- Authenticated users accessing auth routes → `/dashboard`
- Preserves intended destination for post-login redirect

### 2. Session Management
- Automatic session refresh in middleware
- Proper cookie handling across server/client boundaries
- Secure token management

### 3. Error Handling
- Graceful fallbacks for authentication errors
- Proper error logging and user feedback
- Fallback redirects to login on middleware errors

### 4. Security Best Practices
- Uses anon key instead of service role key in server client
- Proper cookie configuration
- CSRF protection through Supabase's built-in mechanisms

## Usage Examples

### In Server Components
```typescript
import { getUser } from '@/lib/supabase/auth/utils'

export default async function ProfilePage() {
  const user = await getUser()
  
  if (!user) {
    // This won't happen due to layout protection, but good for safety
    return <div>Please log in</div>
  }
  
  return <div>Welcome, {user.email}!</div>
}
```

### In Client Components
```typescript
import { createClient } from '@/lib/supabase/auth/client'

const supabase = createClient()

export default function ClientComponent() {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])
  
  return <div>{user ? `Hello ${user.email}` : 'Loading...'}</div>
}
```

### In API Routes
```typescript
import { createClient } from '@/lib/supabase/auth/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (!user || error) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Handle authenticated request
}
```

## Configuration

### Environment Variables Required
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Middleware Configuration
The middleware is configured to run on all routes except:
- Static files (`_next/static`, `_next/image`)
- Favicon
- Public assets (images, etc.)

## Benefits of This Implementation

1. **Professional Architecture**: Follows Next.js and Supabase best practices
2. **Type Safety**: Full TypeScript support throughout
3. **Performance**: Efficient session management and caching
4. **Security**: Proper authentication flow and token handling
5. **User Experience**: Seamless redirects and session persistence
6. **Maintainability**: Clean separation of concerns and reusable utilities
7. **Scalability**: Easy to extend with additional protected routes or auth logic

## Troubleshooting

### Common Issues
1. **Infinite redirects**: Check that auth routes are properly configured in middleware
2. **Session not persisting**: Verify cookie configuration and domain settings
3. **TypeScript errors**: Ensure all imports are using the correct client types

### Debug Mode
Add logging to middleware for debugging:
```typescript
console.log('Middleware running for:', request.nextUrl.pathname)
console.log('User authenticated:', !!user)
```

This implementation provides a robust, professional-grade authentication system that handles all edge cases and provides excellent user experience while maintaining security best practices.
