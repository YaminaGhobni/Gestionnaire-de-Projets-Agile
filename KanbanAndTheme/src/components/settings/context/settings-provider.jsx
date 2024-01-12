import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';

import { SettingsContext } from './settings-context';
import { useLocalStorage } from '../../../hooks/use-local-storage';

// ----------------------------------------------------------------------
const STORAGE_KEY = 'settings';

export function SettingsProvider({ children, defaultSettings }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultSettings);

  // Drawer
  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [state, update, openDrawer, onToggleDrawer, onCloseDrawer]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}

SettingsProvider.propTypes = {
  children: PropTypes.object,
  defaultSettings: PropTypes.object,
};
