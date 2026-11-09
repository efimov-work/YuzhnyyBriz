export function Wave({ className }: { className?: string }) {
    return <svg className={className} viewBox="0 0 48 38" fill="none" aria-hidden="true">
        <path d="M11 21a13 13 0 0 1 26 0M3 24c7 0 7-4 14-4s7 4 14 4 7-4 14-4M3 33c7 0 7-4 14-4s7 4 14 4 7-4 14-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>;
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
    return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d={diagonal ? 'M6 18 18 6M7 6h11v11' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>;
}

export function Brand() {
    return <a className="brand" href="#top" aria-label="Южный бриз, на главную">
        <Wave /><span>Южный<br/>бриз</span>
    </a>;
}
