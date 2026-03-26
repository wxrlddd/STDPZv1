import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { renderStart } from './pages/StartPage.js';
import { renderGame } from './pages/GamePage.js';
import { renderResults } from './pages/ResultsPage.js';
import { el } from './utils/dom.js';

export const View = {
    START: 'start',
    GAME: 'game',
    RESULTS: 'results'
};

let rootContent = null;

export function initApp() {
    const root = document.getElementById('app');
    if (!root) {
        console.error('Помилка: Не знайдено <div id="app"> у index.html');
        return;
    }

    rootContent = el('main', { class: 'container stack' });

    root.innerHTML = '';
    root.append(
        Header(),
        rootContent,
        Footer()
    );

    setView(View.START);
}

//функція перемикання сторінок
export function setView(view, payload = {}) {
    if (!rootContent) return;

    //очищаємо поточний контент
    rootContent.innerHTML = '';

    switch (view) {
        case View.START:
            renderStart(rootContent);
            break;
        case View.GAME:
            renderGame(rootContent, payload);
            break;
        case View.RESULTS:
            renderResults(rootContent, payload);
            break;
        default:
            rootContent.textContent = 'Сторінку не знайдено';
    }
}