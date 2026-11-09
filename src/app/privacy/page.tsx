import type { Metadata } from 'next';
import { asset } from '@/lib/asset';

export const metadata: Metadata = { title: 'Обработка данных', robots: { index: false, follow: false }, alternates: { canonical: null } };

export default function PrivacyPage() {
    return <main className="wrap privacy">
        <a className="text-link" href={asset('/')}>← На главную</a>
        <h1>Обработка данных</h1>
        <p>Для обратного звонка форма запрашивает имя и телефон. При включённом приёме заявок эти сведения обрабатываются для ответа на запрос и могут быть переданы настроенному получателю заявок.</p>
        <p>В демонстрационном режиме форма проверяет заполнение полей и показывает результат без отправки данных.</p>
    </main>;
}
