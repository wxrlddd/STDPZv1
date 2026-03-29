import { Button } from '../src/components/Button.js';

export default {
  title: 'Components/Button',
  tags: ['autodocs']
};

export const Primary = () => {
  return Button('Click me', () => alert('Clicked'));
};

export const Ghost = () => {
  return Button('Ghost button', () => alert('Ghost clicked'), 'ghost');
};

export const DisabledLike = () => {
  const btn = Button('Static button', null);
  btn.disabled = true;
  return btn;
};