// components/ThemeToggle.tsx
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeIcon from '@mui/icons-material/DarkMode'; // Moon icon
import LightModeIcon from '@mui/icons-material/LightMode'; // Sun icon
import { useTheme } from '@/app/context/ThemeContext';

const ThemeToggle = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <Tooltip title={isDarkMode ? 'Toggle light mode' : 'Toggle dark mode'}>
            <IconButton onClick={toggleDarkMode} color="inherit">
                {isDarkMode ? <DarkModeIcon sx={{ color: "whitesmoke" }} /> : <LightModeIcon sx={{ color: "orange" }} />}
            </IconButton>
        </Tooltip>
    );
};

export default ThemeToggle;