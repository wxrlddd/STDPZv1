import { WORDS } from '../data/words.js';
import { shuffleString } from '../utils/shuffle.js';

export function useAnagram() {

    function filterWords(difficulty) {
        return WORDS.filter(w => {
            const len = w.length;
            if (difficulty === 'EASY') return len <= 4;
            if (difficulty === 'HARD') return len >= 7;
            return len > 4 && len < 7; // NORMAL
        });
    }

    function pickWord(difficulty = 'NORMAL') {
        const available = filterWords(difficulty);
        //якщо раптом фільтр порожній (fallback)
        const pool = available.length > 0 ? available : WORDS;

        const idx = Math.floor(Math.random() * pool.length);
        const target = pool[idx];

        let shuffled = shuffleString(target);
        let tries = 0;
        while (shuffled === target && tries < 20) {
            shuffled = shuffleString(target);
            tries++;
        }
        return { target, shuffled };
    }

    function normalize(s) { return String(s).trim().toUpperCase(); }
    function isCorrect(answer, target) { return normalize(answer) === normalize(target); }

    return { pickWord, isCorrect };
}