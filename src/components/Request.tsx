'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { asset } from '@/lib/asset';
import { Arrow } from './Brand';

const enabled = process.env.NEXT_PUBLIC_LEADS_ENABLED === '1';
const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || asset('/api/lead');

export default function Request() {
    const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'demo' | 'error'>('idle');
    const [message, setMessage] = useState('');

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (state === 'sending') return;
        const form = event.currentTarget;
        const values = new FormData(form);
        const phone = String(values.get('phone') || '').trim();
        const name = String(values.get('name') || '').trim();
        if (!name || !/^\+?[\d\s().-]{10,25}$/.test(phone) || !/^\d{10,15}$/.test(phone.replace(/\D/g, ''))) {
            setState('error');
            setMessage('Укажите имя и телефон с от 10 до 15 цифрами.');
            return;
        }
        if (!enabled) {
            setState('demo');
            setMessage('Форма заполнена. В предпросмотре данные не отправляются.');
            return;
        }
        setState('sending');
        setMessage('');
        try {
            const params = new URLSearchParams(window.location.search);
            const utm = Object.fromEntries([...params].filter(([key]) => /^utm_(source|medium|campaign|content|term)$/.test(key)));
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    kind: 'callback', name, phone, consent: values.get('consent') === 'on', website: values.get('website'),
                    interest: values.get('interest'), source: window.location.pathname, utm
                }),
                signal: AbortSignal.timeout(15000)
            });
            const result = await response.json();
            if (!response.ok || result.ok !== true) throw new Error('Request failed');
            setState('sent');
            setMessage('Заявка принята. С вами свяжутся по указанному номеру.');
            form.reset();
        } catch {
            setState('error');
            setMessage('Заявка не отправилась. Попробуйте ещё раз.');
        }
    }

    return <form className="request-form" method="post" action={endpoint} onSubmit={submit}>
        <div className="form-fields">
            <label>Ваше имя<input name="name" autoComplete="name" placeholder="Имя" required maxLength={80} /></label>
            <label>Телефон<input type="tel" name="phone" autoComplete="tel" placeholder="+7 900 000 00 00" required maxLength={25} /></label>
        </div>
        <label>Что вас интересует?
            <select name="interest" defaultValue="Планировки и цены">
                <option>Планировки и цены</option><option>Условия покупки</option><option>Расположение и проект</option>
            </select>
        </label>
        <label className="honey" aria-hidden="true">Сайт<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <label className="consent"><input type="checkbox" name="consent" required /><span>Согласен на <a href={asset('/privacy/')}>обработку данных</a> для обратного звонка</span></label>
        <button className="button form-submit" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Отправляем…' : 'Заказать звонок'}<Arrow diagonal /></button>
        {!enabled && <p className="demo-note">Локальный предпросмотр формы</p>}
        <p className="form-status" aria-live="polite" data-state={state}>{message}</p>
    </form>;
}
