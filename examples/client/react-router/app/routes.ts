import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('login', 'routes/auth/login.tsx'),
  route('logout', 'routes/auth/logout.tsx'),
  route('api/auth/callback', 'routes/auth/callback.tsx'),
] satisfies RouteConfig;
