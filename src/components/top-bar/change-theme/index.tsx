import styles from './change-theme.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDarkTheme, setLightTheme }
  from '@/lib/features/themeSlice';
import DisplaySolid from './theme-icons/DisplaySolid';
import SunSolid from './theme-icons/SunSolid';
import MoonSolid from './theme-icons/MoonSolid';

function ChangeTheme() {

  const [systemTheme, setSystemTheme] = useState<string>('system-theme');
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const preColSch = mediaQuery.matches ? 'light-theme' : 'dark-theme';
    setSystemTheme(preColSch);
  }, []);

  const dispatch = useDispatch();
  function handleSetTheme(theme: string) {
    if (theme === 'light-theme') {
      dispatch(setLightTheme('light-theme'));
    } else {
      dispatch(setDarkTheme('dark-theme'))
    }
  }

  const [check, setCheck] = useState([false, true, false]);

  return (
    <form className={styles['theme-switcher']}>
      <label htmlFor='set-light-theme' className={styles.switch}>
        <input type="radio" name="theme" value='set-light-theme'
          id="set-light-theme" className={styles.option}
          checked={check[0]}
          onChange={() => {
            handleSetTheme('light-theme');
            setCheck([true, false, false]);
          }}
        />
        <SunSolid className={styles['switch-icon']} />
      </label>
      <label htmlFor='set-system-theme' className={styles.switch}>
        <input type="radio" name="theme" value='set-system-theme'
          id="set-system-theme" className={styles.option}
          checked={check[1]}
          onChange={() => {
            handleSetTheme(systemTheme);
            setCheck([false, true, false]);
          }}
        />
        <DisplaySolid className={styles['switch-icon']} />
      </label>
      <label htmlFor='set-dark-theme' className={styles.switch}>
        <input type="radio" name="theme" value='set-dark-theme'
          id="set-dark-theme" className={styles.option}
          checked={check[2]}
          onChange={() => {
            handleSetTheme('dark-theme');
            setCheck([false, false, true]);
          }}
        />
        <MoonSolid className={styles['switch-icon']} />
      </label>
    </form>
  )
}

export default ChangeTheme;
