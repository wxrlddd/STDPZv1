import { el } from '../utils/dom.js';
import { setConsent } from '../services/consent.service.js';

export function CookieBanner(onAccept) {
    const banner = el('div', {
        style: `
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            padding: 16px;
            background: #111;
            color: white;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            z-index: 9999;
        `
    }, [
        el('span', {
            text: 'Ми використовуємо cookies для збереження налаштувань. Продовжуючи, ви погоджуєтесь.'
        }),

        el('button', {
            text: 'прийняти',
            onclick: () => {
                setConsent('accepted');
                banner.remove();
                if (onAccept) onAccept();
            }
        })
    ]);

    return banner;
}