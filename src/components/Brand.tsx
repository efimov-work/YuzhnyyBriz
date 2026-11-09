import { asset } from '@/lib/asset';

export function Emblem({ className }: { className?: string }) {
    return <img className={className} src={asset('/mark.svg')} alt="" width="64" height="64" />;
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
    return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d={diagonal ? 'M6 18 18 6M7 6h11v11' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>;
}

export function Brand() {
    return <a className="brand" href="#top" aria-label="Южный бриз, на главную">
        <Emblem /><span>Южный<br/>бриз</span>
    </a>;
}
