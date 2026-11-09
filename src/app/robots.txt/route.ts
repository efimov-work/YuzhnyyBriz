import { NOINDEX, siteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export function GET() {
    return new Response(`User-agent: *\n${NOINDEX ? 'Disallow: /' : 'Allow: /'}\nSitemap: ${siteUrl}sitemap.xml\n`, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
}
