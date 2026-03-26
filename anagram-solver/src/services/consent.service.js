const CONSENT_KEY = 'user_cookie_consent';

export function getConsent() {
    return localStorage.getItem(CONSENT_KEY);
}

export function setConsent(value) {
    localStorage.setItem(CONSENT_KEY, value);
}

export function hasConsent() {
    return getConsent() === 'accepted';
}