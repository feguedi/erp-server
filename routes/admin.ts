import type { ServerRoute } from '@hapi/hapi';

export const adminRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/admin',
    handler(res, h) {
    },
  },
];
