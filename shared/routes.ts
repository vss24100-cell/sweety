import { z } from 'zod';
import { insertWishSchema, wishes } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  wishes: {
    list: {
      method: 'GET' as const,
      path: '/api/wishes' as const,
      responses: {
        200: z.array(z.custom<typeof wishes.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/wishes' as const,
      input: insertWishSchema,
      responses: {
        201: z.custom<typeof wishes.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
