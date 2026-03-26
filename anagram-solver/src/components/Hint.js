export function HintLabel(text = 'Підказка: …') {
    const el = document.createElement('div');
    el.className = 'badge';
    el.textContent = text;
    return {
        el,
        set(t) { el.textContent = t; }
    };
}
