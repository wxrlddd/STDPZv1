import { el } from '../utils/dom.js';

export function Footer(){
    const y = new Date().getFullYear();

    return el('div', {
        class: 'container',
        style: 'display:flex;justify-content:center;gap:12px;align-items:center; margin-top: 20px;'
    }, [
        el('span', { class: 'badge', text: `© ${y}` }),
        el('span', { class: 'badge', text: 'Без логіки • Тільки структура' })
    ]);
}