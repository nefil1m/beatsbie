import { useEffect } from 'react';
import { throttle } from 'lodash';
import { isMacLike } from '../lib/environment';

const normalizeHotkeyString = (keys) => keys.join('-').toLowerCase();

const registeredHotkeys = {};

export const useHotkey = (keys: string[], action) => {
  useEffect(() => {
    registeredHotkeys[normalizeHotkeyString(keys)] = action;
  });
};

export const useRegisterHotkeyHandler = () => {
  useEffect(() => {
    const handler = throttle((e: KeyboardEvent) => {
      const { ctrlKey, metaKey, altKey, shiftKey } = e;
      const input = [];

      if (isMacLike ? metaKey : ctrlKey) input.push('Ctrl');
      if (shiftKey) input.push('Shift');
      if (altKey) input.push('Alt');

      input.push(e.key);

      const hotkeyString = normalizeHotkeyString(input);
      const handlerForMatchedKeys = registeredHotkeys[hotkeyString];
      if (handlerForMatchedKeys) handlerForMatchedKeys(e);
    }, 200);

    window.addEventListener('keydown', handler);

    return () => window.removeEventListener('keydown', handler);
  });
};
