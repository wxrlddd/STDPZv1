export function useTimer(initialSeconds = 60) {
    let seconds = initialSeconds;
    let id = null;

    const start = (onTick, onEnd) => {
        stop();
        seconds = initialSeconds;
        id = setInterval(() => {
            seconds -= 1;
            if (typeof onTick === 'function') onTick(seconds);
            if (seconds <= 0) {
                stop();
                if (typeof onEnd === 'function') onEnd();
            }
        }, 1000);
    };

    const stop = () => { if (id) { clearInterval(id); id = null; } };
    const get = () => seconds;
    const setInitial = (v) => { initialSeconds = v; };

    return { start, stop, get, setInitial };
}
