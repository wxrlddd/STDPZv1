import { el } from '../utils/dom.js';
import { Portal } from '../utils/portal.js';

export function Modal({ title, content, actions = [] }) {
    //стилі  оверлею
    const overlayStyle = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center;
        z-index: 1000; backdrop-filter: blur(4px);
    `;

    const card = el('div', { class: 'card stack', style: 'min-width: 300px; max-width: 90%; animation: popIn 0.3s ease;' }, [
        el('h2', { text: title }),
        ...(Array.isArray(content) ? content : [content]),
        el('div', { style: 'display:flex; gap:10px; justify-content:flex-end; margin-top: 20px;' }, actions)
    ]);

    const overlay = el('div', { style: overlayStyle }, [card]);

    //через портал в body
    const portal = Portal(overlay);

    return {
        close: () => portal.destroy(),
        el: overlay
    };
}
//анімація
if (!document.getElementById('modal-style')) {
    const style = document.createElement('style');
    style.id = 'modal-style';
    style.textContent = `@keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }`;
    document.head.append(style);
}