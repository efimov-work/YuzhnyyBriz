# YuzhnyyBriz

Локальный лендинг жилого комплекса «Южный бриз» в Курпатах. Next.js App Router, React и TypeScript. Визуальные материалы и проверенные сведения собраны в [досье проекта](research/materials.md).

## Запуск

```bash
npm ci
npm run dev
```

Адрес предпросмотра: http://127.0.0.1:3021.

`npm run check` проверяет типы. `npm run build` собирает серверную версию, `npm start` запускает её.

## Заявки

По умолчанию форма работает как демонстрация. Для серверного приёма скопируйте `.env.example` в `.env.local` и задайте `NEXT_PUBLIC_LEADS_ENABLED=1` и `LEADS_ENABLED=1`. API сохраняет заявку в `.data/callbacks.jsonl`. Можно указать путь на постоянном диске через `LEADS_DATA_DIR`.

Для уведомлений получателя задайте `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`. `TELEGRAM_THREAD_ID` нужен только для темы в группе. Перед включением публичной формы добавьте данные оператора и согласованный текст обработки персональных данных.

GitHub Pages обслуживает статические файлы. Для рабочих заявок на Pages нужен внешний HTTPS-обработчик с CORS для адреса сайта. Передайте его в `NEXT_PUBLIC_LEAD_ENDPOINT` и установите `NEXT_PUBLIC_LEADS_ENABLED=1` в окружении сборки. Форма отправляет JSON с полями `kind`, `name`, `phone`, `consent`, `website`, `interest`, `source` и `utm`. Успешный ответ содержит `{"ok":true}`.

## SEO и GitHub Pages

`NEXT_PUBLIC_SITE_URL` задаёт адрес домена без пути. `NEXT_PUBLIC_BASE_PATH` задаёт префикс, если сайт расположен в подпапке. `SITE_NOINDEX=0` включает индексацию при указанном адресе. В шаблоне есть canonical, Open Graph, Twitter Card, JSON-LD, sitemap, robots.txt, иконка и манифест.

`npm run export` собирает файлы в `out/`. `npm run pages` собирает локальную ветку `gh-pages` для `/YuzhnyyBriz/` с закрытой индексацией по умолчанию. Для этой сборки переменные задаются в окружении команды. После согласования отправьте ветки на GitHub и выберите `gh-pages` как источник Pages. Перед публикацией сверяются права на рендеры и данные из проектных деклараций.
