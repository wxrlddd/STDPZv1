export function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);

    Object.entries(props).forEach(([key, value]) => {
        if (value == null) return;

        if (key === 'class') {
            node.className = value;
        } else if (key === 'text') {
            node.textContent = value;
        } else if (key.startsWith('on') && typeof value === 'function') {
            node.addEventListener(key.slice(2), value);
        } else {
            node.setAttribute(key, value);
        }
    });

    children.forEach((child) => {
        node.append(child instanceof Node ? child : document.createTextNode(child));
    });

    return node;
}