'use client';

import { useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/asset';
import { gallery, shorePhotos } from '@/lib/content';
import { Arrow } from './Brand';

export function Motion() {
    useEffect(() => {
        if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const observer = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.08 });
        const nodes = document.querySelectorAll('[data-reveal]');
        for (const node of nodes) {
            node.classList.add('will-reveal');
            observer.observe(node);
        }
        return () => {
            observer.disconnect();
            for (const node of nodes) node.classList.remove('will-reveal');
        };
    }, []);
    return null;
}

export function Gallery() {
    const [index, setIndex] = useState(0);
    const [slides, setSlides] = useState({ active: 0, previous: -1 });
    const pictures = useRef<(HTMLImageElement | null)[]>([]);
    const [expanded, setExpanded] = useState(false);
    const [autoplay, setAutoplay] = useState(true);
    const [inView, setInView] = useState(false);
    const [motionAllowed, setMotionAllowed] = useState(false);
    const frame = useRef<HTMLButtonElement>(null);
    const dialog = useRef<HTMLDialogElement>(null);
    const start = useRef<number | null>(null);
    const current = gallery[index];
    const rotating = autoplay && inView && motionAllowed && !expanded;

    useEffect(() => {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updatePreference = () => setMotionAllowed(!preference.matches);
        updatePreference();
        preference.addEventListener('change', updatePreference);

        const observer = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= 0.35), { threshold: 0.35 });
        if (frame.current) observer.observe(frame.current);
        return () => {
            observer.disconnect();
            preference.removeEventListener('change', updatePreference);
        };
    }, []);

    useEffect(() => {
        if (!rotating) return;
        const timer = window.setInterval(() => {
            if (!document.hidden) setIndex(i => (i + 1) % gallery.length);
        }, 5000);
        return () => window.clearInterval(timer);
    }, [index, rotating]);

    useEffect(() => {
        if (slides.active === index) return;
        const picture = pictures.current[index];
        if (!picture) return;
        let cancelled = false;
        void picture.decode().then(() => {
            if (!cancelled) setSlides({ active: index, previous: slides.active });
        }).catch(() => undefined);
        return () => { cancelled = true; };
    }, [index, slides.active]);

    function change(step: number) {
        setIndex(i => (i + step + gallery.length) % gallery.length);
    }

    function open() {
        dialog.current?.showModal();
        setExpanded(true);
    }

    return <div className="gallery" onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            change(event.key === 'ArrowLeft' ? -1 : 1);
        }
    }}>
        <div className="gallery-main">
            <button type="button" ref={frame} className="gallery-frame" onClick={open} aria-label={`Увеличить: ${current.title}`}
                onTouchStart={event => { start.current = event.touches[0].clientX; }}
                onTouchEnd={event => {
                    if (start.current === null) return;
                    const distance = event.changedTouches[0].clientX - start.current;
                    if (Math.abs(distance) > 45) change(distance > 0 ? -1 : 1);
                    start.current = null;
                }}>
                {gallery.map(({ file }, i) => <img key={file} ref={element => { pictures.current[i] = element; }}
                    data-layer={i === slides.active ? 'active' : i === slides.previous ? 'previous' : 'hidden'}
                    src={asset(`/assets/images/${file}.webp`)} alt="" loading="lazy" decoding="async" />)}
                <span className="expand" aria-hidden="true"><Arrow diagonal /></span>
            </button>
            <div className="gallery-meta">
                <div aria-live={rotating ? "off" : "polite"}><strong>{current.title}</strong><p>{current.text}</p></div>
                <div className="gallery-nav">
                    {motionAllowed && <button type="button" className="circle" onClick={() => setAutoplay(value => !value)} aria-label={autoplay ? 'Приостановить смену кадров' : 'Запустить смену кадров'}><span aria-hidden="true">{autoplay ? 'Ⅱ' : '▷'}</span></button>}
                    <button type="button" className="circle previous" onClick={() => change(-1)} aria-label="Предыдущая визуализация"><Arrow /></button>
                    <span className="counter">{String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
                    <button type="button" className="circle" onClick={() => change(1)} aria-label="Следующая визуализация"><Arrow /></button>
                </div>
            </div>
        </div>
        <div className="thumbs" aria-label="Выбрать визуализацию">
            {gallery.map(({ file, title }, i) => <button type="button" key={file} aria-label={title} aria-pressed={i === index} onClick={() => setIndex(i)}>
                <img src={asset(`/assets/images/thumb-${file}.webp`)} alt="" loading="lazy" />
            </button>)}
        </div>
        <dialog ref={dialog} className="media-dialog" aria-label="Просмотр визуализации" onClose={() => setExpanded(false)} onClick={event => {
            if (event.target === event.currentTarget) dialog.current?.close();
        }}>
            <button type="button" className="circle dialog-close" onClick={() => dialog.current?.close()} aria-label="Закрыть">×</button>
            {expanded && <img src={asset(`/assets/images/${current.file}.webp`)} alt={current.title} />}
            <div className="dialog-nav">
                <button type="button" className="circle previous" onClick={() => change(-1)} aria-label="Предыдущая визуализация"><Arrow /></button>
                <span>{current.title}</span>
                <button type="button" className="circle" onClick={() => change(1)} aria-label="Следующая визуализация"><Arrow /></button>
            </div>
        </dialog>
    </div>;
}

export function ShoreGallery() {
    const [index, setIndex] = useState(0);
    const dialog = useRef<HTMLDialogElement>(null);
    const photo = shorePhotos[index];
    const change = (step: number) => setIndex(i => (i + step + shorePhotos.length) % shorePhotos.length);
    const source = `https://commons.wikimedia.org/wiki/File:${photo.source}`;

    return <>
        <div className="shore-photos">
            {shorePhotos.map(({ file, title }, i) => <figure key={file} data-reveal="image">
                <button type="button" onClick={() => {
                    setIndex(i);
                    dialog.current?.showModal();
                }} aria-label={`Увеличить: ${title}`}>
                    <img src={asset(`/assets/location/${file}-small.webp`)}
                        srcSet={`${asset(`/assets/location/${file}-small.webp`)} 640w, ${asset(`/assets/location/${file}.webp`)} 1600w`}
                        sizes={i === 0 || i === shorePhotos.length - 1 ? '(max-width: 800px) 94vw, 62vw' : '(max-width: 800px) 46vw, 30vw'}
                        alt={title} loading="lazy" />
                    <span className="expand"><Arrow diagonal /></span>
                </button>
                <figcaption><span>{String(i + 1).padStart(2, '0')}</span>{title}</figcaption>
            </figure>)}
        </div>
        <dialog ref={dialog} className="media-dialog shore-dialog" aria-label="Архивные фотографии Курпат" onClick={event => {
            if (event.target === event.currentTarget) dialog.current?.close();
        }} onKeyDown={event => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                change(event.key === 'ArrowLeft' ? -1 : 1);
            }
        }}>
            <button type="button" className="circle dialog-close" onClick={() => dialog.current?.close()} aria-label="Закрыть фото">×</button>
            <img key={photo.file} src={asset(`/assets/location/${photo.file}.webp`)} alt={photo.title} loading="lazy" />
            <div className="dialog-nav">
                <button type="button" className="circle previous" onClick={() => change(-1)} aria-label="Предыдущее фото"><Arrow /></button>
                <div aria-live="polite"><strong>{photo.title}</strong><br/><a href={source} target="_blank" rel="noreferrer">{photo.author} · Wikimedia Commons</a> · <a href={`https://creativecommons.org/licenses/${photo.license}/`} target="_blank" rel="noreferrer">Лицензия</a></div>
                <button type="button" className="circle" onClick={() => change(1)} aria-label="Следующее фото"><Arrow /></button>
            </div>
        </dialog>
    </>;
}

export function Film() {
    const dialog = useRef<HTMLDialogElement>(null);
    const preview = useRef<HTMLVideoElement>(null);
    const video = useRef<HTMLVideoElement>(null);
    const resumePreview = useRef(false);
    const [playing, setPlaying] = useState(false);
    const [hasFrame, setHasFrame] = useState(false);
    const source = asset('/assets/video/concept.mp4');

    useEffect(() => {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const player = preview.current;
        if (!preference.matches) void player?.play().catch(() => undefined);
        const stopForReducedMotion = () => {
            if (preference.matches) {
                resumePreview.current = false;
                player?.pause();
            }
        };
        preference.addEventListener('change', stopForReducedMotion);
        return () => preference.removeEventListener('change', stopForReducedMotion);
    }, []);

    return <>
        <video className="hero-video" data-visible={hasFrame} ref={preview} src={source} muted playsInline loop preload="none" aria-hidden="true"
            onPlaying={() => { setPlaying(true); setHasFrame(true); }}
            onPause={() => setPlaying(false)}
            onError={() => { setPlaying(false); setHasFrame(false); }} />
        <div className="film-actions">
            <button type="button" className="film-toggle" aria-label={playing ? 'Приостановить ролик' : 'Воспроизвести ролик'} onClick={() => {
                const player = preview.current;
                if (player?.paused) void player.play().catch(() => undefined);
                else player?.pause();
            }}><span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span></button>
            <button type="button" className="film-button" onClick={() => {
                resumePreview.current = preview.current?.paused === false;
                preview.current?.pause();
                dialog.current?.showModal();
                if (video.current) {
                    video.current.currentTime = 0;
                    void video.current.play().catch(() => undefined);
                }
            }}>Смотреть ролик <Arrow diagonal /></button>
        </div>
        <dialog className="media-dialog film-dialog" ref={dialog} aria-label="Ролик из визуализаций" onClose={() => {
            video.current?.pause();
            if (resumePreview.current) void preview.current?.play().catch(() => undefined);
        }} onClick={event => {
            if (event.target === event.currentTarget) dialog.current?.close();
        }}>
            <button type="button" className="circle dialog-close" onClick={() => dialog.current?.close()} aria-label="Закрыть ролик">×</button>
            <video ref={video} controls muted playsInline preload="none" poster={asset('/assets/images/coast.webp')} src={source} />
            <p>Ролик из архитектурных визуализаций UNK</p>
        </dialog>
    </>;
}
