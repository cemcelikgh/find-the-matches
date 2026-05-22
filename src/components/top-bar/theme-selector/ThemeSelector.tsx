'use client';

import styles from './ThemeSelector.module.css';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { setTheme } from '@/lib/features/themeSlice';
import DisplaySolid from './theme-icons/DisplaySolid';
import SunSolid from './theme-icons/SunSolid';
import MoonSolid from './theme-icons/MoonSolid';

function ChangeTheme() {

  const prefersColorSchemeRef = useRef<string>(null);

  const [check, setCheck] = useState([false, true, false]);

  const dispatch = useAppDispatch();

    useEffect(() => {

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    prefersColorSchemeRef.current = mediaQuery.matches ? 'dark-theme' : 'light-theme';

    function changeHandler(event: MediaQueryListEvent) {
      const mode = event.matches ? 'dark-theme' : 'light-theme';
      prefersColorSchemeRef.current = mode;
      if (check[1]) dispatch(setTheme(mode));
    }

    mediaQuery.addEventListener('change', changeHandler);
    return () => { mediaQuery.removeEventListener('change', changeHandler) }

  }, [check[1], dispatch]);

  function handleSetTheme(theme: string | null) {
    if (theme === 'dark-theme') {
      dispatch(setTheme('dark-theme'));
    } else {
      dispatch(setTheme('light-theme'));
    };
  };

  return (
    <fieldset className={styles['theme-switcher']}>
      <label htmlFor='set-light-theme' className={styles.switch}>
        <input id="set-light-theme" className={styles.option}
          type="radio" name="theme" value='light-theme'
          checked={check[0]}
          onChange={() => {
            handleSetTheme('light-theme');
            setCheck([true, false, false]);
          }}
        />
        <SunSolid className={styles['switch-icon']} />
      </label>
      <label htmlFor='set-system-theme' className={styles.switch}>
        <input id="set-system-theme" className={styles.option}
          type="radio" name="theme" value='system-theme'
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
          type="radio" name="theme" value='dark-theme'
          checked={check[2]}
          onChange={() => {
            handleSetTheme('dark-theme');
            setCheck([false, false, true]);
          }}
        />
        <MoonSolid className={styles['switch-icon']} />
      </label>
    </fieldset>
  );

}

export default ChangeTheme;
