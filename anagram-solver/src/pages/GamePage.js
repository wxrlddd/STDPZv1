import { setView, View } from '../app.js';
import { useGame } from '../hooks/useGame.js';
import { useTimer } from '../hooks/useTimer.js';
import { Button } from '../components/Button.js';
import { AnagramBoard } from '../components/AnagramBoard.js';
import { TimerView } from '../components/Timer.js';
import { HintLabel } from '../components/Hint.js';
import { el } from '../utils/dom.js';

export function renderGame(root, payload = {}) {
    const game = useGame();

    const settings = {
        timeLimit: Number(payload.timeLimit) || 60,
        difficulty: payload.difficulty || 'NORMAL',
        playerName: payload.playerName || 'Гравець'
    };

    startRound();

    function startRound() {
        game.startNewRound(settings);
        renderLayout();
    }

    function renderLayout() {
        root.innerHTML = '';

        const currentState = game.getState();
        const board = AnagramBoard(currentState.shuffled);

        const input = el('input', {
            class: 'input',
            placeholder: 'Введи слово…'
        });

        const timerView = TimerView(settings.timeLimit);
        const hintView = HintLabel('Підказка: (приховано)');
        const messageView = el('small', {
            style: 'min-height: 20px; color: salmon; display: block;'
        });

        const timer = useTimer(settings.timeLimit);

        timer.start(
            (sec) => timerView.set(sec),
            () => {
                game.timeUp();
                goToResults('time');
            }
        );

        const checkBtn = Button('Перевірити', () => {
            const result = game.submit(input.value);

            if (result.empty) {
                messageView.textContent = 'Введи слово перед перевіркою';
                input.focus();
                return;
            }

            if (result.correct) {
                timer.stop();
                goToResults('win');
                return;
            }

            messageView.textContent = 'Неправильно, спробуй ще раз 😉';
            hintView.set('Підказка: (приховано)');
            input.value = '';
            input.focus();
        });

        const hintBtn = Button('Підказка', () => {
            const firstLetter = game.hint();
            hintView.set(`Підказка: перша літера — ${firstLetter}`);
            input.focus();
        }, 'ghost');

        const nextBtn = Button('Нове слово', () => {
            timer.stop();
            startRound();
        }, 'ghost');

        const exitBtn = Button('Вихід', () => {
            timer.stop();
            setView(View.START);
        }, 'ghost');

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                checkBtn.click();
            }
        });

        root.append(
            el('section', { class: 'card stack' }, [
                el('div', { style: 'display:flex; justify-content:space-between; gap:12px; align-items:center;' }, [
                    el('strong', { text: settings.playerName }),
                    el('span', { class: 'badge', text: settings.difficulty })
                ]),
                board,
                input,
                messageView,
                timerView.el,
                hintView.el,
                checkBtn,
                hintBtn,
                nextBtn,
                exitBtn
            ])
        );

        input.focus();
    }

    function goToResults(reason) {
        const result = game.getResult();

        setView(View.RESULTS, {
            ...result,
            reason,
            settings
        });
    }
}