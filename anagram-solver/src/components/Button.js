import { el } from '../utils/dom.js';

export function Button(text, onClick, variant = 'primary') {
    return el('button', {
        class: variant === 'ghost' ? 'btn btn-ghost' : 'btn',
        text,
        onclick: onClick || undefined
    });
}