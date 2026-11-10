export const gallery = [
    { file: 'promenade', title: 'Набережная', text: 'Прогулочная линия вдоль воды', page: 6 },
    { file: 'garden', title: 'Сад у моря', text: 'Тенистые дорожки среди корпусов', page: 5 },
    { file: 'pool', title: 'Вечер у бассейна', text: 'Открытая терраса и мягкий свет', page: 9 },
    { file: 'terraces', title: 'Террасы на склоне', text: 'Светлые фасады и протяжённые балконы', page: 7 },
    { file: 'plaza', title: 'Площадь', text: 'Пространство для встреч', page: 8 },
    { file: 'outlook', title: 'Окно к морю', text: 'Морской горизонт между корпусами', page: 10 },
    { file: 'courtyard', title: 'Внутренний двор', text: 'Ступени, зелень и тень', page: 11 },
    { file: 'coast', title: 'Вид с моря', text: 'Весь склон в одной панораме', page: 4 }
];

export const features = [
    { title: 'Сад на склоне', text: 'Между двумя видовыми аллеями архитекторы разместили каскадный сад. На разных уровнях запланированы места для тихого отдыха и детская площадка.' },
    { title: 'Прогулки у воды', text: 'Нижний маршрут ведёт к набережной. В концепции вдоль неё расположены кафе и рестораны с террасами.' },
    { title: 'Время у бассейна', text: 'В проекте предусмотрены открытый подогреваемый бассейн в саду и спа-центр с бассейном у набережной.' }
];

export const buildingTypes = [
    { title: 'Вдоль шоссе', text: 'Шесть отдельно стоящих корпусов в верхней части участка. По концепции их объединяет подземный паркинг.' },
    { title: 'У самой воды', text: 'Четыре корпуса на общем основании у берега. В основании запланирован спа-центр.' },
    { title: 'Вдоль прогулочной улицы', text: 'Восемь корпусов на первой и второй линиях от моря. На первых этажах у воды предусмотрены кафе и рестораны.' },
    { title: 'На склоне', text: 'Четыре корпуса вдоль серпантина, который соединяет Алупкинское шоссе с нижней видовой аллеей.' }
];

export const projectSource = 'https://unkproject.com/projects/zhilye/yuzhnyy-briz-/';
export const registrySource = 'https://наш.дом.рф/проверка-новостроек/жилой-комплекс-южный-бриз-72509/';
export const mapUrl = 'https://yandex.ru/maps/?text=Курпаты%2C%20Алупкинское%20шоссе';

export const shorePhotos = [
    { file: 'ayu-dag-view', title: 'Берег в сторону Аю-Дага', author: 'Jbboyko', source: 'Курпаты_вид_на_медведь_гору.jpg', license: 'by-sa/4.0' },
    { file: 'sanatorium-angle-1', title: 'Курпаты с моря', author: 'Dmytro Petishkin', source: 'Druzhba_Sanatorium,_Kurpaty_01.jpg', license: 'by/4.0' },
    { file: 'golden-sands', title: 'Золотой пляж', author: 'Dimant', source: 'Golden_Sands_in_Kurpaty.JPG', license: 'by-sa/3.0' },
    { file: 'kurpaty-viewpoint', title: 'Морской горизонт с видовой площадки', author: 'Jbboyko', source: 'Курпаты_видовая.jpg', license: 'by-sa/4.0' },
    { file: 'druzhba-exterior', title: 'Пансионат «Дружба» на склоне', author: 'Евгения Ворошилова', source: 'Пансионат_«Дружба».jpg', license: 'by-sa/4.0' },
    { file: 'sanatorium-angle-2', title: 'Пансионат со стороны воды', author: 'Dmytro Petishkin', source: 'Druzhba_Sanatorium,_Kurpaty_02.jpg', license: 'by/4.0' },
    { file: 'kurpaty-from-the-water', title: 'Берег у санатория', author: 'Dimant', source: 'Sanatorium_%22Kurpaty%22.JPG', license: 'by-sa/3.0' },
    { file: 'shore-and-sanatorium', title: 'Прибрежный склон на закате', author: 'V chekhov', source: '2010.09.07.1746.08.IMG_6851.jpg', license: 'by-sa/4.0' }
];

export const questions = [
    { title: 'Как узнать, какие квартиры сейчас доступны?', text: 'Оставьте заявку на звонок. Уточните интересующий корпус, количество комнат и желаемый вид. Актуальное наличие и стоимость зависят от предложения на момент обращения.' },
    { title: 'Где посмотреть документы и ход строительства?', text: 'Проектные декларации, сроки и фотографии стройки доступны в ЕИСЖС. Смотрите данные именно по тому дому, который рассматриваете.', href: registrySource, label: 'Открыть карточку в ЕИСЖС' },
    { title: 'Что показано на визуализациях?', text: 'Рендеры UNK показывают архитектурную концепцию комплекса. В разделе о Курпатах собраны архивные фотографии побережья и соседнего санатория.' },
    { title: 'Как найти комплекс на карте?', text: 'Ориентир на Алупкинском шоссе в Курпатах: пансионат «Дружба». Участок жилого комплекса расположен рядом, на склоне к морю.', href: mapUrl, label: 'Посмотреть на карте' }
];
