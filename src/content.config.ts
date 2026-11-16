// Khai báo bộ sưu tập bài viết Tin tức (file Markdown trong src/content/tin-tuc)
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const tinTuc = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tin-tuc' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['so-hoa', 'luu-tru', 'du-lich']),
    author: z.string().default('Ban biên tập'),
    image: z.string().optional(),
  }),
});

export const collections = { 'tin-tuc': tinTuc };
