import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '../constants/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://noorejewells.com'

  const posts = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

  return [...routes, ...posts]
}
