import { setView, View } from '../app.js';
import { Button } from '../components/Button.js';
import { el } from '../utils/dom.js';

export function renderResults(root, payload = {}) {
    const {
        target,
        input,
        status,
        hintsUsed,
        timeSpentSec,
        reason,
        playerName,
        settings
    } = payload;

    const title = status === 'won' ? '🎉 Результати раунду' : '⏰ Раунд завершено';

    const statusText = status === 'won' ? 'Перемога' : status === 'lost' ? 'Поразка' : 'Невідомо';
    const reasonText = reason === 'win' ? 'Слово вгадано' : reason === 'time' ? 'Час вийшов' : '—';

    root.innerHTML = '';
    root.append(
        el('section', { class: 'card stack' }, [
            el('h2', { text: title }),
            el('div', { class: 'badge', text: `Гравець: ${playerName ?? '—'}` }),
            el('div', { class: 'badge', text: `Статус: ${statusText}` }),
            el('div', { class: 'badge', text: `Правильне слово: ${target ?? '—'}` }),
            el('div', { class: 'badge', text: `Твоя відповідь: ${input || '—'}` }),
            el('div', { class: 'badge', text: `Підказок використано: ${hintsUsed ?? 0}` }),
            el('div', { class: 'badge', text: `Час: ${timeSpentSec ?? 0} с` }),
            el('div', { class: 'badge', text: `Причина завершення: ${reasonText}` }),

            Button('Спробувати ще раз', () => {
                setView(View.GAME, settings ?? {});
            }),

            Button('На головну', () => {
                setView(View.START);
            }, 'ghost')
        ])
    );
}