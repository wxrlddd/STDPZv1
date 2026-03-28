import { el } from '../utils/dom.js';
import { setConsent } from '../services/consent.service.js';

export function CookieBanner() {
    const textBlock = el('div', {
        style: 'display:flex; flex-direction:column; gap:8px;'
    }, [
        el('strong', {
            text: 'Використання cookies та LocalStorage'
        }),
        el('span', {
            text: 'Цей застосунок використовує cookies та LocalStorage для збереження налаштувань гри і запам’ятовування вашого вибору щодо конфіденційності.'
        }),
        el('a', {
        href: '/public/privacy.html',
        text: 'Переглянути Privacy Policy',
        style: 'color:#9ecbff; text-decoration:underline;'
        })
    ]);

    const acceptBtn = el('button', {
        text: 'Прийняти',
        onclick: () => {
            setConsent('accepted');
            banner.remove();
        },
        style: `
            padding: 10px 16px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        `
    });

    const declineBtn = el('button', {
        text: 'Відхилити',
        onclick: () => {
            setConsent('declined');
            banner.remove();
        },
        style: `
            padding: 10px 16px;
            border: 1px solid #777;
            background: transparent;
            color: white;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        `
    });

    const buttons = el('div', {
        style: 'display:flex; gap:10px; flex-wrap:wrap;'
    }, [acceptBtn, declineBtn]);

    const banner = el('div', {
        style: `
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            padding: 18px;
            background: rgba(15, 15, 20, 0.96);
            color: white;
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            flex-wrap: wrap;
            z-index: 9999;
            box-shadow: 0 10px 30px rgba(0,0,0,0.35);
        `
    }, [
        textBlock,
        buttons
    ]);

    return banner;
}