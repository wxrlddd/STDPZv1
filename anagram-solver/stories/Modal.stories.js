import { Modal } from '../src/components/Modal.js';
import { Button } from '../src/components/Button.js';
import { el } from '../src/utils/dom.js';

export default {
  title: 'Components/Modal',
  tags: ['autodocs']
};

export const Default = () => {
  const content = el('div', {}, [
    el('h3', { text: 'Modal window' }),
    el('p', { text: 'This is a modal example.' })
  ]);

  const modal = Modal(content);
  return Button('Open modal', () => modal.open());
};

export const WithLongText = () => {
  const content = el('div', {}, [
    el('h3', { text: 'Rules' }),
    el('p', {
      text: 'Use the input field to guess the original word from the anagram before the timer expires.'
    })
  ]);

  const modal = Modal(content);
  return Button('Show info modal', () => modal.open(), 'ghost');
};

export const ResultExample = () => {
  const content = el('div', {}, [
    el('h3', { text: 'Round complete' }),
    el('p', { text: 'Correct word: REACT' }),
    el('p', { text: 'Hints used: 1' })
  ]);

  const modal = Modal(content);
  modal.open(); //відкриється відразу

  return el('div');
};
