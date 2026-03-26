import { LetterTile } from './LetterTile.js';

export function AnagramBoard(letters='КОТ'){
    const wrap = document.createElement('div');
    wrap.className = 'letters';
    [...letters].forEach(ch => wrap.append(LetterTile(ch)));
    return wrap;
}
