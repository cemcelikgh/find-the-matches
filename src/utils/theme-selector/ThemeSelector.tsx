'use client';

import { setTheme } from '@/lib/features/themeSlice';
import { Theme } from '@/types/types';
import { useAppDispatch } from '@/lib/hooks';
import { useEffect, useRef, useState } from 'react';
import DisplaySolid from './icons/DisplaySolid';
import SunSolid from './icons/SunSolid';
import MoonSolid from './icons/MoonSolid';
import styles from './ThemeSelector.module.css';

function ThemeSelector() {

  const [check, setCheck] = useState([false, true, false]);
  const prefersColorSchemeRef = useRef<Theme>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    prefersColorSchemeRef.current = mediaQuery.matches ? 'light' : 'dark';

    function changeHandler(event: MediaQueryListEvent) {
      const mode = event.matches ? 'light' : 'dark';
      prefersColorSchemeRef.current = mode;
      if (check[1]) dispatch(setTheme(mode));
    }

    mediaQuery.addEventListener('change', changeHandler);
    return () => { mediaQuery.removeEventListener('change', changeHandler) };

  }, [check[1], dispatch]);

  function handleSetTheme(theme: Theme | null) {
    if (theme === 'light') dispatch(setTheme('light'));
    else  dispatch(setTheme('dark'));
  };

  return (
    <fieldset className={styles['theme-switcher']}>
      <label
        htmlFor='set-light-theme'
        className={styles.switch}
      >
        <input
          id="set-light-theme"
          className={styles.option}
          type="radio"
          name="theme"
          value='light'
          checked={check[0]}
          onChange={() => {
            handleSetTheme('light');
            setCheck([true, false, false]);
          }}
        />
        <SunSolid className={styles['switch-icon']} />
      </label>
      <label
        htmlFor='set-system-theme'
        className={styles.switch}
      >
        <input
          id="set-system-theme"
          className={styles.option}
          type="radio"
          name="theme"
          value='system'
          checked={check[1]}
          onChange={() => {
            handleSetTheme(prefersColorSchemeRef.current);
            setCheck([false, true, false]);
          }}
        />
        <DisplaySolid className={styles['switch-icon']} />
      </label>
      <label
        htmlFor='set-dark-theme'
        className={styles.switch}
      >
        <input
          id="set-dark-theme"
          className={styles.option}
          type="radio"
          name="theme"
          value='dark'
          checked={check[2]}
          onChange={() => {
            handleSetTheme('dark');
            setCheck([false, false, true]);
          }}
        />
        <MoonSolid className={styles['switch-icon']} />
      </label>
    </fieldset>
  );

}

export default ThemeSelector;
