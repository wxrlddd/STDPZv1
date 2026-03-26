import { el } from '../utils/dom.js';

export function Header(){
    return el('div', {
        class: 'container',
        style: 'display:flex;gap:12px;align-items:center;justify-content:center; margin-bottom: 20px;'
    }, [
        el('strong', { text: 'Anagram Solver' }),
        el('span', { class: 'badge', text: 'Skeleton' })
    ]);
}