function getPortalRoot() {
    let portalRoot = document.getElementById('portal-root');

    if (!portalRoot) {
        portalRoot = document.createElement('div');
        portalRoot.id = 'portal-root';
        document.body.append(portalRoot);
    }

    return portalRoot;
}

export function Portal(child) {
    const portalRoot = getPortalRoot();
    portalRoot.append(child);

    return {
        destroy: () => {
            child.remove();

            if (portalRoot.childElementCount === 0) {
                portalRoot.remove();
            }
        }
    };
}