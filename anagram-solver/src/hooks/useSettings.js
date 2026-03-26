const STORAGE_KEY = 'anagram_settings_v1';

const DEFAULT_SETTINGS = {
    timeLimit: 60,
    difficulty: 'NORMAL', // EASY, NORMAL, HARD
    playerName: 'Гравець'
};

export function useSettings() {
    function load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
        } catch (e) {
            return DEFAULT_SETTINGS;
        }
    }

    function save(settings) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch (e) {
            console.error('Save failed', e);
        }
    }

    return { load, save };
}