import { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/menu-popover';
import ConfirmDialog from 'src/components/confirm-dialog';

// ----------------------------------------------------------------------

export default function SprintTableRow({
  name,
  avatarUrl,
  objectif,
  type,
  lead,
  status,
  onEditRow,
  onDeleteRow,
  onViewRow,
}) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };
  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell>{name}</TableCell>

        <TableCell>{objectif}</TableCell>

        <TableCell align="left">{type}</TableCell>
        <TableCell>
          <Label color={(status === 'in progress' && 'error') || 'success'}>{status}</Label>
        </TableCell>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={lead} src={avatarUrl} />
          <Typography variant="subtitle2" noWrap>
            {lead}
          </Typography>
        </Stack>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-fill" />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

SprintTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  objectif: PropTypes.any,
  lead: PropTypes.any,
  name: PropTypes.any,
  type: PropTypes.any,
  status: PropTypes.string,
  onEditRow: PropTypes.string,
  onDeleteRow: PropTypes.string,
  onViewRow: PropTypes.string,
};
