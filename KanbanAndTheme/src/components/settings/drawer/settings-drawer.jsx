import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';


import { Popover } from '@mui/material';
import Iconify from '../../iconify';
import Scrollbar from '../../scrollbar';
import { useSettingsContext } from '../context';
import BaseOptions from './base-option';

// ----------------------------------------------------------------------

export default function SettingsDrawer() {
  const theme = useTheme();

  const settings = useSettingsContext();

  const labelStyles = {
    mb: 1.5,
    color: 'text.disabled',
    fontWeight: 'fontWeightSemiBold',
  };

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Settings
      </Typography>
    </Stack>
  );

  const renderMode = (
    <div>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        Mode
      </Typography>

      <BaseOptions
        value={settings.themeMode}
        onClose={settings.onClose}
        onChange={(newValue) => settings.onUpdate('themeMode', newValue)}
        options={['light', 'dark']}
        icons={['sun', 'moon']}
      />
    </div>
  );

  return (
    <>
      <IconButton
        onClick={settings.onToggle}
        sx={{
          width: 40,
          height: 40,
          background: (thm) => alpha(thm.palette.grey[500], 0.08),
          ...(settings.open && {
            background: (thm) =>
              `linear-gradient(135deg, ${thm.palette.primary.light} 0%, ${thm.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Iconify
          icon={settings.themeMode === 'dark' ? 'ion:moon' : 'solar:sun-bold-duotone'}
          color="black"
        />
      </IconButton>
      <Popover
        open={!!settings.open}
        anchorEl={settings.open}
        onClose={settings.onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 6,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        {renderHead}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {renderMode}
          </Stack>
        </Scrollbar>
      </Popover>{' '}
    </>
  );
}
