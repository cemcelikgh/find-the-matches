'use client';

import styles from './ThemeSelector.module.css';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { setTheme } from '@/lib/features/themeSlice';
import DisplaySolid from './theme-icons/DisplaySolid';
import SunSolid from './theme-icons/SunSolid';
import MoonSolid from './theme-icons/MoonSolid';
import { Theme } from '@/types/types';

function ThemeSelector() {

  const prefersColorSchemeRef = useRef<Theme>(null);

  const [check, setCheck] = useState([false, true, false]);

  const dispatch = useAppDispatch();

  useEffect(() => {

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    prefersColorSchemeRef.current = mediaQuery.matches ? 'dark' : 'light';

    function changeHandler(event: MediaQueryListEvent) {
      const mode = event.matches ? 'dark' : 'light';
      prefersColorSchemeRef.current = mode;
      if (check[1]) dispatch(setTheme(mode));
    };

    mediaQuery.addEventListener('change', changeHandler);
    return () => { mediaQuery.removeEventListener('change', changeHandler) };

  }, [check[1], dispatch]);

  function handleSetTheme(theme: Theme | null) {
    if (theme === 'dark') {
      dispatch(setTheme('dark'));
    } else {
      dispatch(setTheme('light'));
    };
  };

  return (
    <fieldset className={styles['theme-switcher']}>
      <label htmlFor='set-light-theme' className={styles.switch}>
        <input id="set-light-theme" className={styles.option}
          type="radio" name="theme" value='light'
          checked={check[0]}
          onChange={() => {
            handleSetTheme('light');
            setCheck([true, false, false]);
          }}
        />
        <SunSolid className={styles['switch-icon']} />
      </label>
      <label htmlFor='set-system-theme' className={styles.switch}>
        <input id="set-system-theme" className={styles.option}
          type="radio" name="theme" value='system'
          checked={check[1]}
          onChange={() => {
            handleSetTheme(prefersColorSchemeRef.current);
            setCheck([false, true, false]);
          }}
        />
        <DisplaySolid className={styles['switch-icon']} />
      </label>
      <label htmlFor='set-dark-theme' className={styles.switch}>
        <input id="set-dark-theme" className={styles.option}
          type="radio" name="theme" value='dark'
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
