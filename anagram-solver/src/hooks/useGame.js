import { useAnagram } from './useAnagram.js';

export function useGame() {
    const { pickWord, isCorrect } = useAnagram();

    const state = {
        target: '',
        shuffled: '',
        input: '',
        status: 'idle',
        hintsUsed: 0,
        startedAt: null,
        finishedAt: null,
        settings: {}
    };

    function startNewRound(settings) {
        state.settings = { ...settings };

        const { target, shuffled } = pickWord(settings.difficulty);

        state.target = target;
        state.shuffled = shuffled;
        state.input = '';
        state.status = 'playing';
        state.hintsUsed = 0;
        state.startedAt = Date.now();
        state.finishedAt = null;
    }

    function submit(answer) {
        if (state.status !== 'playing') {
            return { correct: false, empty: false };
        }

        const normalizedAnswer = String(answer).trim();
        if (!normalizedAnswer) {
            state.input = '';
            return { correct: false, empty: true };
        }

        const ok = isCorrect(normalizedAnswer, state.target);

        if (ok) {
            state.status = 'won';
            state.finishedAt = Date.now();
        }

        state.input = normalizedAnswer;

        return { correct: ok, empty: false };
    }

    function timeUp() {
        if (state.status === 'playing') {
            state.status = 'lost';
            state.finishedAt = Date.now();
        }
    }

    function hint() {
        if (state.status !== 'playing') return '';
        state.hintsUsed += 1;
        return state.target[0] ?? '';
    }

    function getResult() {
        const spentMs = (state.finishedAt ?? Date.now()) - (state.startedAt ?? Date.now());

        return {
            target: state.target,
            input: state.input,
            status: state.status,
            hintsUsed: state.hintsUsed,
            timeSpentSec: Math.max(0, Math.round(spentMs / 1000)),
            playerName: state.settings.playerName,
            settings: { ...state.settings }
        };
    }

    function getState() {
        return { ...state, settings: { ...state.settings } };
    }

    return {
        startNewRound,
        submit,
        timeUp,
        hint,
        getResult,
        getState
    };
}