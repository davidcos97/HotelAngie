import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(5),
  content: z.string().min(10),
  coverImage: z.string().optional(),
  author: z.string().min(2),
  category: z.string().min(2),
  tags: z.array(z.string()).optional().default([]),
  readingMinutes: z.number().int().positive().optional().default(5)
});

export const blogPostUpdateSchema = blogPostSchema.partial();

export const commentSchema = z.object({
  name: z.string().min(2),
  message: z.string().min(2)
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
