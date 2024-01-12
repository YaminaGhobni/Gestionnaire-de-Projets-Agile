import { useMemo } from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { palette } from './palette';
import { shadows } from './shadows';
import { componentsOverrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows';
import { useSettingsContext } from '../components/settings/context';
import { createContrast } from './options/contrast';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const settings = useSettingsContext();
  const contrast = createContrast(settings.themeContrast, settings.themeMode);

  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...palette(settings.themeMode),
        ...contrast.palette,
      },
      customShadows: {
        ...customShadows(settings.themeMode),
        ...contrast.palette,
      },
      direction: settings.themeDirection,
      shadows: shadows(settings.themeMode),
      shape: { borderRadius: 8 },
      typography,
    }),
    [contrast.palette, settings.themeDirection, settings.themeMode]
  );

  const theme = createTheme(memoizedValue);

  theme.components = merge(componentsOverrides(theme), contrast.components);

  // const themeWithLocale = useMemo(() => createTheme(theme), [theme]);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
