import { el } from '../utils/dom.js';
import { Portal } from '../utils/portal.js';

export function Modal(content) {
    const body = Array.isArray(content)
        ? el('div', { class: 'stack' }, content)
        : el('div', { class: 'stack' }, [content]);

    const overlay = el('div', { class: 'modal-overlay' }, [
        el('div', { class: 'modal card stack' }, [
            body
        ])
    ]);

    let portalInstance = null;

    function open() {
        if (!portalInstance) {
            portalInstance = Portal(overlay);
        }
    }

    function close() {
        if (portalInstance) {
            portalInstance.destroy();
            portalInstance = null;
        }
    }

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            close();
        }
    });

    return {
        open,
        close,
        el: overlay
    };
}