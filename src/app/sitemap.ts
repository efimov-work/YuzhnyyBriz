import type { MetadataRoute } from 'next';
import { NOINDEX, siteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    return NOINDEX ? [] : [{ url: siteUrl }];
}
