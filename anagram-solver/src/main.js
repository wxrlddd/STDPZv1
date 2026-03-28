import { initApp } from './app.js';
import { CookieBanner } from './components/CookieBanner.js';
import { hasAnsweredConsent } from './services/consent.service.js';

initApp();

if (!hasAnsweredConsent()) {
    document.body.append(CookieBanner());
}