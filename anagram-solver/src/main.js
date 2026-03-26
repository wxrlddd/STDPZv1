import { initApp } from './app.js';

initApp();

import { CookieBanner } from './components/CookieBanner.js';
import { hasConsent } from './services/consent.service.js';

if (!hasConsent()) {
    document.body.append(CookieBanner());
}