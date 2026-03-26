
export function TimerView(initial = 60) {
    const el = document.createElement('div');
    el.className = 'badge';
    el.textContent = `Таймер: ${initial}s`;
    return {
        el,
        set(value) { el.textContent = `Таймер: ${value}s`; }
    };
}
