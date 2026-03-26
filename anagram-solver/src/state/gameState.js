export const gameState = {
    timeLimitSec: 60,
    currentLetters: null,
    input: '',
    hintsUsed: 0,
};
export function resetState() {
    gameState.currentLetters = null;
    gameState.input = '';
    gameState.hintsUsed = 0;
}
