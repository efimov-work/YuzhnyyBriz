import type { MetadataRoute } from 'next';
import { asset } from '@/lib/asset';
import { DESCRIPTION, SITE_NAME } from '@/lib/seo';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: SITE_NAME,
        short_name: SITE_NAME,
        description: DESCRIPTION,
        start_url: asset('/'),
        display: 'standalone',
        background_color: '#f7f4eb',
        theme_color: '#18382e',
        icons: [{ src: asset('/mark.svg'), sizes: 'any', type: 'image/svg+xml' }]
    };
}
