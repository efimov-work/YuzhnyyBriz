import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { asset } from '@/lib/asset';
import { DESCRIPTION, NOINDEX, origin, shareImage, SITE_NAME, siteUrl, TITLE } from '@/lib/seo';
import './globals.css';
import './responsive.css';

const display = localFont({
    src: [{ path: '../fonts/Stapel-Light.ttf', weight: '300' }, { path: '../fonts/Stapel-Medium.ttf', weight: '500' }],
    variable: '--display'
});

const body = localFont({
    src: [{ path: '../fonts/circe.woff2', weight: '400' }, { path: '../fonts/circe_bold.woff2', weight: '700' }],
    variable: '--body'
});

export const metadata: Metadata = {
    metadataBase: new URL(origin),
    title: { default: TITLE, template: '%s | Южный бриз' },
    description: DESCRIPTION,
    alternates: { canonical: siteUrl },
    robots: { index: !NOINDEX, follow: !NOINDEX },
    icons: { icon: asset('/mark.svg') },
    manifest: asset('/manifest.webmanifest'),
    openGraph: { type: 'website', locale: 'ru_RU', siteName: SITE_NAME, title: TITLE, description: DESCRIPTION, url: siteUrl, images: [{ url: shareImage, width: 1200, height: 630, alt: 'Архитектурная визуализация Южного бриза со стороны моря' }] },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [shareImage] },
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined, yandex: process.env.YANDEX_VERIFICATION || undefined }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <html lang="ru" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>;
}
