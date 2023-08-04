import type { ServerRoute } from '@hapi/hapi';

export const crmRoutes: ServerRoute[] = [
  {
    path: '/crm',
    method: 'GET',
    handler(req, h) {
    },
  },
];
