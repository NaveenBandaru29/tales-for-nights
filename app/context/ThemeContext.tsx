'use client';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type ThemeContextType = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        let initialIsDark = false;

        // 1. Check for a saved user preference in localStorage
        if (storedTheme) {
            initialIsDark = storedTheme === 'dark';
        }
        // 2. Fallback to the user's system preference
        else {
            initialIsDark = systemPrefersDark;
        }

        setIsDarkMode(initialIsDark);
        root.classList.toggle('dark', initialIsDark);
    }, []);

    const toggleDarkMode = () => {
        const root = window.document.documentElement;
        const newIsDarkMode = !isDarkMode;

        setIsDarkMode(newIsDarkMode);
        root.classList.toggle('dark', newIsDarkMode);
        localStorage.setItem('theme', newIsDarkMode ? 'dark' : 'light');
    };

    const value = {
        isDarkMode,
        toggleDarkMode,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Custom hook to use the theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};