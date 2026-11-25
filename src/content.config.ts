// Khai báo bộ sưu tập bài viết Tin tức (file Markdown trong src/content/tin-tuc)
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Bài tiếng Anh nằm ở src/content/tin-tuc-en, đặt CÙNG TÊN FILE với bài tiếng Việt
// để nút chuyển ngôn ngữ dẫn đúng sang bản dịch.
const schema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  category: z.enum(['diem-den-so', 'ket-noi-du-lich', 'trai-nghiem-so']),
  author: z.string().default('Ban biên tập'),
  image: z.string().optional(),
});

const tinTuc = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tin-tuc' }),
  schema,
});

const tinTucEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tin-tuc-en' }),
  schema,
});

export const collections = { 'tin-tuc': tinTuc, 'tin-tuc-en': tinTucEn };
