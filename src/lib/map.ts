export const MAP_WIDTH = 1400;
export const MAP_HEIGHT = 820;
export const MAP_ROTATION = 52;
export const MAP_SCALE = 0.142;

export function projectMap(latitude: number, longitude: number) {
    const angle = MAP_ROTATION * Math.PI / 180;
    const east = (longitude - 34.14) * 111320 * Math.cos(44.46 * Math.PI / 180);
    const north = (latitude - 44.46) * 111320;
    return {
        x: 700 + (east * Math.cos(angle) + north * Math.sin(angle) - 650) * MAP_SCALE,
        y: 380 + (east * Math.sin(angle) - north * Math.cos(angle) - 200) * MAP_SCALE
    };
}

export const MAP_PLACES = [
    { id: 'project', name: 'Южный бриз', detail: 'Алупкинское шоссе, ориентир', latitude: 44.4473, longitude: 34.1351 },
    { id: 'druzhba', name: 'Пансионат «Дружба»', detail: 'Курпаты', latitude: 44.445482, longitude: 34.133665 },
    { id: 'swallow', name: 'Ласточкино гнездо', detail: 'Мыс Ай-Тодор', latitude: 44.430639, longitude: 34.128625 },
    { id: 'palace', name: 'Ливадийский дворец', detail: 'Дворец и парк', latitude: 44.467792, longitude: 34.143611 },
    { id: 'yalta', name: 'Набережная Ялты', detail: 'Центр города', latitude: 44.4941432, longitude: 34.1658018 }
];

export function placeMapUrl(place: typeof MAP_PLACES[number]) {
    return `https://yandex.ru/maps/?pt=${place.longitude},${place.latitude}&z=17&l=map`;
}
