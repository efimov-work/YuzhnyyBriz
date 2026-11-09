'use client';

import { useEffect, useRef } from 'react';
import { asset } from '@/lib/asset';
import { MAP_HEIGHT, MAP_PLACES, MAP_ROTATION, MAP_SCALE, MAP_WIDTH, placeMapUrl, projectMap } from '@/lib/map';
import { Arrow, Emblem } from './Brand';

const digits = [
    'M3.5 1C1.7 1 1 2.6 1 5s.7 4 2.5 4S6 7.4 6 5 5.3 1 3.5 1Z',
    'M1.3 3 3.5 1v8M1 9h5',
    'M1 3.1C1 1.8 2 1 3.5 1S6 1.9 6 3.1C6 5.2 1 6.5 1 9h5',
    'M1.2 2.2C2 .5 6 .5 6 3c0 1.3-1.2 2-2.8 2C4.8 5 6 5.7 6 7c0 2.5-4 2.5-4.8.8',
    'M4.8 9V1L1 6.5h5',
    'M6 1H1.6l-.5 3.7C2.3 3.7 6 3.9 6 6.6c0 2.8-3.8 2.9-5 1.4'
];

function MapNumber({ number }: { number: number }) {
    return <svg className="map-number" viewBox="0 0 14 10" width="14" height="10" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
            <path d={digits[0]} /><path d={digits[number]} transform="translate(7)" />
        </g>
    </svg>;
}

export default function LocationMap() {
    const viewport = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = viewport.current;
        if (!element) return;
        const project = MAP_PLACES[0];
        const { x } = projectMap(project.latitude, project.longitude);
        const centerProject = () => {
            element.scrollLeft = element.scrollWidth * x / MAP_WIDTH - element.clientWidth / 2;
        };
        centerProject();
        const observer = new ResizeObserver(centerProject);
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return <figure className="coast-map" data-reveal="image">
        <div className="map-viewport" ref={viewport} tabIndex={0} role="region" aria-label="Карта от Гаспры до Ялты. На узком экране прокручивается по горизонтали">
            <div className="map-canvas">
                <img className="map-base" src={asset('/assets/maps/yuzhnyy-briz-coast.svg')} alt="Береговая линия, дороги и здания от Гаспры до Ялты" width={MAP_WIDTH} height={MAP_HEIGHT} loading="lazy" decoding="async" />
                <svg className="map-orientation" viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} fill="none" aria-hidden="true">
                    <g transform={`translate(110 115) rotate(${MAP_ROTATION})`} stroke="currentColor" strokeWidth="1.5">
                        <circle r="31" strokeDasharray="128 67" transform="rotate(-28)" />
                        <circle r="25" strokeDasharray="106 51" transform="rotate(-28)" />
                        <path d="M0 43V-49m-6 10 6-10 6 10" />
                    </g>
                    <text x="160" y="77" fill="currentColor" fontSize="18">С</text>
                    <g transform="translate(84 745)" stroke="currentColor" strokeWidth="2">
                        <path d={`M0 -6v6h${MAP_SCALE * 1000}v-6M${MAP_SCALE * 500} -6v6`} />
                        <text y="22" fill="currentColor" stroke="none" fontSize="16">0</text>
                        <text x={MAP_SCALE * 1000} y="22" fill="currentColor" stroke="none" fontSize="16" textAnchor="end">1 км</text>
                    </g>
                    <text x="961" y="635" className="map-sea-name" textAnchor="middle">Чёрное море</text>
                </svg>
                {MAP_PLACES.map((place, index) => {
                    const { x, y } = projectMap(place.latitude, place.longitude);
                    return <a key={place.id} className={`map-pin map-pin-${place.id}`} href={placeMapUrl(place)} target="_blank" rel="noreferrer"
                        style={{ left: `${x / MAP_WIDTH * 100}%`, top: `${y / MAP_HEIGHT * 100}%` }} aria-label={`${place.name}. Открыть на карте`}>
                        <span className="map-pin-dot">{index === 0 ? <Emblem /> : <MapNumber number={index + 1} />}</span>
                        <span className="map-pin-name">{place.name}</span>
                    </a>;
                })}
            </div>
        </div>
        <figcaption className="map-caption">
            <span>Побережье Большой Ялты</span><span className="map-scroll-hint">Листайте карту <Arrow /></span>
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap</a>
        </figcaption>
        <div className="map-places">{MAP_PLACES.map((place, index) => <a key={place.id} href={placeMapUrl(place)} target="_blank" rel="noreferrer">
            <span><MapNumber number={index + 1} /></span>
            <div><strong>{place.name}</strong><small>{place.detail}</small></div><Arrow diagonal />
        </a>)}</div>
    </figure>;
}
