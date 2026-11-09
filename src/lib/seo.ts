import { asset, BASE_PATH } from './asset';

export const SITE_NAME = 'Южный бриз';
export const TITLE = 'Южный бриз | Жилой комплекс у моря в Курпатах';
export const DESCRIPTION = 'Жилой комплекс «Южный бриз» на Алупкинском шоссе в Курпатах. Архитектурная концепция UNK, виды на море, галерея и заявка на обратный звонок.';

function configuredOrigin() {
    try {
        const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || '');
        return ['http:', 'https:'].includes(url.protocol) ? url.origin : null;
    } catch {
        return null;
    }
}

export const NOINDEX = process.env.SITE_NOINDEX !== '0' || !configuredOrigin();
export const origin = configuredOrigin() || 'http://127.0.0.1:3021';
export const siteUrl = `${origin}${BASE_PATH}/`;
export const shareImage = `${origin}${asset('/assets/images/share.jpg')}`;

export const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: TITLE,
    description: DESCRIPTION,
    url: siteUrl,
    inLanguage: 'ru-RU',
    primaryImageOfPage: shareImage,
    about: {
        '@type': 'Residence',
        name: SITE_NAME,
        address: { '@type': 'PostalAddress', streetAddress: 'Алупкинское шоссе', addressLocality: 'Курпаты', addressRegion: 'Крым' }
    }
};
