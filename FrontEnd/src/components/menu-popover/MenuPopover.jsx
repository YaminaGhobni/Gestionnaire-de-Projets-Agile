import PropTypes from 'prop-types';

// @mui
import { Popover } from '@mui/material';

//
import { StyledArrow } from './styles';
import getPosition from './getPosition';

// ----------------------------------------------------------------------

export default function MenuPopover({
  open,
  children,
  arrow = 'top-right',
  disabledArrow,
  sx,
  ...other
}) {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow);

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      PaperProps={{
        sx: {
          p: 2,
          width: 'auto',
          overflow: 'inherit',
          ...style,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '& svg': { mr: 2, width: 20, height: 20, flexShrink: 0 },
          },
          ...sx,
        },
      }}
      {...other}
    >
      {!disabledArrow && <StyledArrow arrow={arrow} />}

      {children}
    </Popover>
  );
}

MenuPopover.propTypes = {
  open: PropTypes.any,
  arrow: PropTypes.any,
  children: PropTypes.any,
  disabledArrow: PropTypes.any,
  sx: PropTypes.any,
};
