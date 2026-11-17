// Lấy danh sách bài viết Tin tức theo ngôn ngữ (mới nhất trước)
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './index';

export type Post = CollectionEntry<'tin-tuc'> | CollectionEntry<'tin-tuc-en'>;

export async function getPosts(lang: Lang): Promise<Post[]> {
  const posts: Post[] = lang === 'en' ? await getCollection('tin-tuc-en') : await getCollection('tin-tuc');
  return posts.sort((a, b) => +b.data.date - +a.data.date);
}
