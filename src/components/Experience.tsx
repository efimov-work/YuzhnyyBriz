'use client';

import { useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/asset';
import { gallery } from '@/lib/content';
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
        }, { threshold: 0.12 });
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
    const [expanded, setExpanded] = useState(false);
    const dialog = useRef<HTMLDialogElement>(null);
    const start = useRef<number | null>(null);
    const current = gallery[index];
    const change = (step: number) => setIndex(i => (i + step + gallery.length) % gallery.length);

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
            <button type="button" className="gallery-frame" onClick={open} aria-label={`Увеличить: ${current.title}`}
                onTouchStart={event => { start.current = event.touches[0].clientX; }}
                onTouchEnd={event => {
                    if (start.current === null) return;
                    const distance = event.changedTouches[0].clientX - start.current;
                    if (Math.abs(distance) > 45) change(distance > 0 ? -1 : 1);
                    start.current = null;
                }}>
                <img key={current.file} src={asset(`/assets/images/${current.file}.webp`)} alt={current.title} loading="lazy" />
                <span className="expand" aria-hidden="true"><Arrow diagonal /></span>
            </button>
            <div className="gallery-meta">
                <div aria-live="polite"><strong>{current.title}</strong><p>{current.text}</p></div>
                <div className="gallery-nav">
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

export function Film() {
    const dialog = useRef<HTMLDialogElement>(null);
    const video = useRef<HTMLVideoElement>(null);

    return <>
        <button type="button" className="film-button" onClick={() => {
            dialog.current?.showModal();
            if (video.current) {
                video.current.currentTime = 0;
                void video.current.play().catch(() => undefined);
            }
        }}><span className="play" aria-hidden="true">▷</span> Смотреть ролик</button>
        <dialog className="media-dialog film-dialog" ref={dialog} aria-label="Ролик из визуализаций" onClose={() => video.current?.pause()} onClick={event => {
            if (event.target === event.currentTarget) dialog.current?.close();
        }}>
            <button type="button" className="circle dialog-close" onClick={() => dialog.current?.close()} aria-label="Закрыть ролик">×</button>
            <video ref={video} controls playsInline preload="none" poster={asset('/assets/images/coast.webp')} src={asset('/assets/video/concept.mp4')} />
            <p>Ролик из архитектурных визуализаций UNK</p>
        </dialog>
    </>;
}
