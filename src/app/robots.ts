import type { MetadataRoute } from 'next'

const SITE_URL = 'https://ieum-log.shop'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/wedding/invite/',
        '/wedding/editor/',
        '/wedding/dashboard/',
        '/wreath/order/',
        '/wreath/redirect/',
        '/api/',
        '/auth/',
        '/login',
        '/signup',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
