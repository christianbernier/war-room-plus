const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
};

const LOCAL_STORAGE_THEME_KEY = 'war-room-theme';
const DARK_MODE_CSS_CLASS = 'dark-mode';
const DARK_MODE_TOGGLE_ID = 'dark-mode-toggle';

/**
 * @description Gets the current theme for War Room from local storage.
 * @returns The theme, as an element of THEMES
 */
const getCurrentStyle = () => {
    const localStorageTheme = window.localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    
    // Make sure the theme in local storage is supported
    if (localStorageTheme === THEMES.LIGHT || localStorageTheme === THEMES.DARK) {
        return localStorageTheme;
    }

    // By default, return the light theme
    return THEMES.LIGHT;
}

/**
 * @description Update the style of War Room with the provided style.
 * @param {Theme} style The theme that should be applied.
 */
const updateStyles = (style) => {
    if (style === THEMES.DARK) {
        document.body.classList.add(DARK_MODE_CSS_CLASS);
    } else {
        document.body.classList.remove(DARK_MODE_CSS_CLASS);
    }
}

/**
 * @description Add the theme toggle button to the page once it loads.
 */
const addDarkModeToggle = setInterval(() => {
    const recurringTasksButton = document.querySelector('[href="https://war.elk.sh/recurring"]');
    if (!recurringTasksButton) {
        return;
    };

    const quickLinksContainer = recurringTasksButton.parentNode;
    quickLinksContainer.classList.add('gap-y-1');
    quickLinksContainer.classList.add('sm:gap-y-1.5');

    // Some elements take a little while to load in, so refresh the
    // dark mode styles just in case stuff hasn't loaded yet
    updateStyles(getCurrentStyle())

    const darkModeToggle = document.createElement('a');
    darkModeToggle.classList = recurringTasksButton.classList;
    darkModeToggle.id = DARK_MODE_TOGGLE_ID;
    darkModeToggle.innerHTML = `${(getCurrentStyle() === THEMES.LIGHT) ? "Enable" : "Disable"} dark mode`
    darkModeToggle.onclick = () => {
        const style = getCurrentStyle();
        darkModeToggle.innerHTML = `${(getCurrentStyle() === THEMES.LIGHT) ? "Diable" : "Enable"} dark mode`;
        window.localStorage.setItem(LOCAL_STORAGE_THEME_KEY, (style === THEMES.LIGHT) ? THEMES.DARK : THEMES.LIGHT);
        updateStyles((style === THEMES.LIGHT) ? THEMES.DARK : THEMES.LIGHT);
    }

    recurringTasksButton.after(darkModeToggle);

    clearInterval(addDarkModeToggle);
}, 1);

updateStyles(getCurrentStyle());
