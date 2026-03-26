export function LetterTile(ch){
    const d = document.createElement('div');
    d.className = 'tile';
    d.textContent = ch;
    return d;
}
