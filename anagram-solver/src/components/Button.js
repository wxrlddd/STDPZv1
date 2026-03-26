import { el } from '../utils/dom.js';
export function Button(label, onClick, variant='primary'){
    return el('button', { class:`btn ${variant}`, onClick, text:label });
}
