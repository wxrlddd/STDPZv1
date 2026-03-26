import { setView, View } from '../app.js';
import { Button } from '../components/Button.js';
import { el } from '../utils/dom.js';
import { useForm } from '../hooks/useForm.js';
import { useSettings } from '../hooks/useSettings.js';

export function renderStart(root) {
    const { load, save } = useSettings();
    const settings = load();

    const validate = (values) => {
        const errors = {};

        if (!String(values.playerName).trim()) {
            errors.playerName = 'Введи ім\'я';
        }

        if (Number(values.timeLimit) < 10) {
            errors.timeLimit = 'Мінімум 10 секунд';
        }

        if (Number(values.timeLimit) > 300) {
            errors.timeLimit = 'Максимум 300 секунд';
        }

        return errors;
    };

    const form = useForm({
        initialValues: settings,
        validate,
        onSubmit: (values) => {
            save(values);
            setView(View.GAME, values);
        }
    });

    const playerNameField = form.register('playerName');
    const timeLimitField = form.register('timeLimit');
    const difficultyField = form.register('difficulty');

    const nameInput = el('input', {
        class: 'input',
        placeholder: 'Твоє ім\'я',
        ...playerNameField
    });
    playerNameField.ref(nameInput);

    const timeInput = el('input', {
        class: 'input',
        type: 'number',
        placeholder: 'Час (сек)',
        ...timeLimitField
    });
    timeLimitField.ref(timeInput);

    const difficultySelect = el('select', {
        class: 'input',
        ...difficultyField
    }, [
        el('option', { value: 'EASY', text: 'Легко (3-4 літери)' }),
        el('option', { value: 'NORMAL', text: 'Нормально (5-6 літер)' }),
        el('option', { value: 'HARD', text: 'Складно (7+ літер)' })
    ]);
    difficultySelect.value = settings.difficulty;
    difficultyField.ref(difficultySelect);

    root.innerHTML = '';
    root.append(
        el('section', { class: 'card stack' }, [
            el('h1', { text: 'Anagram Solver' }),
            el('p', { text: 'Налаштування гри' }),

            el('form', {
                style: 'display:flex; flex-direction:column; gap:12px;',
                onsubmit: form.handleSubmit
            }, [
                el('label', { class: 'badge', text: 'Гравець:' }),
                nameInput,

                el('label', { class: 'badge', text: 'Складність:' }),
                difficultySelect,

                el('label', { class: 'badge', text: 'Ліміт часу (сек):' }),
                timeInput,

                Button('Почати гру', null)
            ])
        ])
    );
}