import { Arrow, Brand, Wave } from '@/components/Brand';
import { Film, Gallery, Motion } from '@/components/Experience';
import Request from '@/components/Request';
import { asset } from '@/lib/asset';
import { features, mapUrl, projectSource, registrySource } from '@/lib/content';
import { jsonLd } from '@/lib/seo';

export default function Home() {
    return <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        <Motion />
        <a className="skip" href="#content">К содержанию</a>
        <header className="header wrap" id="top">
            <Brand />
            <nav className="main-nav" aria-label="Разделы сайта">
                <a href="#project">О проекте</a><a href="#gallery">Галерея</a><a href="#location">Расположение</a>
            </nav>
            <a className="button header-cta" href="#callback">Заказать звонок <Arrow diagonal /></a>
        </header>
        <main id="content">
            <section className="hero wrap" aria-labelledby="hero-title">
                <div className="hero-type">
                    <div className="hero-copy">
                        <p className="eyebrow"><span className="dot" /> Курпаты, Большая Ялта</p>
                        <h1 id="hero-title">Южный бриз<span>.</span></h1>
                    </div>
                    <div className="hero-aside">
                        <p>Жилой комплекс там,<br/>где горы встречают море.</p>
                        <a className="text-link" href="#project">Открыть проект <Arrow diagonal /></a>
                    </div>
                </div>
                <figure className="hero-figure">
                    <img className="hero-img" src={asset('/assets/images/coast.webp')}
                        srcSet={`${asset('/assets/images/coast-small.webp')} 980w, ${asset('/assets/images/coast.webp')} 1920w`}
                        sizes="(max-width: 720px) 100vw, 94vw" width="1920" height="1070" alt="Архитектурная визуализация Южного бриза со стороны моря" fetchPriority="high" />
                    <div className="hero-shade" />
                    <div className="hero-photo-label"><span className="line" /> Южный берег Крыма</div>
                    <Film />
                </figure>
                <p className="image-credit">Архитектурная визуализация · UNK</p>
            </section>

            <section className="project wrap section" id="project">
                <div className="section-tag" data-reveal><span>01</span> О проекте</div>
                <div className="project-intro" data-reveal>
                    <h2>Жить в ритме моря</h2>
                    <p>«Южный бриз» спускается от Алупкинского шоссе к Чёрному морю. Архитекторы UNK развернули корпуса по рельефу: к воде открываются аллеи, террасы и просветы между светлыми фасадами.</p>
                </div>
                <div className="project-images" data-reveal>
                    <figure><img src={asset('/assets/images/outlook.webp')} alt="Вид на море между террасами двух корпусов" loading="lazy" width="1920" height="1070"/><figcaption>Просвет к морю</figcaption></figure>
                    <figure><img src={asset('/assets/images/courtyard.webp')} alt="Озеленённый проход со ступенями между жилыми корпусами" loading="lazy" width="1892" height="1592"/><figcaption>Двор на склоне</figcaption></figure>
                </div>
                <div className="features">
                    {features.map(({ title, text }, index) => <article data-reveal key={title}><span>0{index + 1}.</span><h3>{title}</h3><p>{text}</p></article>)}
                </div>
            </section>

            <section className="gallery-section section" id="gallery">
                <div className="wrap">
                    <div className="section-tag" data-reveal><span>02</span> Галерея</div>
                    <div className="section-heading" data-reveal><h2>Восемь взглядов<br/>на побережье</h2><p>Виды из архитектурной концепции UNK. Они показывают, как может выглядеть комплекс.</p></div>
                    <Gallery />
                </div>
            </section>

            <section className="location wrap section" id="location">
                <div className="section-tag" data-reveal><span>03</span> Расположение</div>
                <div className="location-grid">
                    <div data-reveal>
                        <h2>Курпаты.<br/>Между склоном<br/>и морем.</h2>
                        <p>Комплекс проектируется на Алупкинском шоссе, рядом с пансионатом «Курпаты» и Золотым пляжем.</p>
                        <a className="button outline" href={mapUrl} target="_blank" rel="noreferrer">Открыть карту <Arrow diagonal /></a>
                    </div>
                    <figure data-reveal>
                        <a href={asset('/assets/images/plan.webp')} target="_blank" rel="noreferrer" aria-label="Открыть генеральный план в полном размере">
                            <img src={asset('/assets/images/plan.webp')} alt="Генеральный план комплекса из архитектурной концепции" loading="lazy" width="1900" height="1344"/>
                            <span className="expand"><Arrow diagonal /></span>
                        </a>
                        <figcaption>Генеральный план · Концепция UNK</figcaption>
                    </figure>
                </div>
                <div className="location-note" data-reveal><span>Документы и ход строительства</span><a className="text-link" href={registrySource} target="_blank" rel="noreferrer">Карточка в ЕИСЖС <Arrow diagonal /></a></div>
            </section>

            <section className="callback section" id="callback">
                <div className="wrap callback-grid">
                    <div data-reveal>
                        <div className="section-tag"><span>04</span> Обратный звонок</div>
                        <h2>Ваш адрес<br/>у моря</h2>
                        <p>Оставьте номер, чтобы узнать о планировках, актуальных ценах и условиях покупки.</p>
                        <Wave className="callback-wave" />
                    </div>
                    <Request />
                    <noscript><style>{".request-form{display:none}"}</style>Для заполнения формы включите JavaScript.</noscript>
                </div>
            </section>
        </main>
        <footer className="footer wrap">
            <Brand />
            <p>Курпаты, Алупкинское шоссе.<br/>Изображения показывают архитектурную концепцию.</p>
            <div><a href={projectSource} target="_blank" rel="noreferrer">Архитектура UNK <Arrow diagonal /></a><a href={asset('/privacy/')}>Обработка данных</a></div>
        </footer>
    </>;
}
