import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import AddUser from './modals/AddUser/AddUser';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteUser } from 'src/my-store/slices/users-rolesSlice';
const { confirm } = Modal;

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  company,
  role,
  isVerified,
  status,
  email,
  handleClick,
  user,
}) {
  const [open, setOpen] = useState(null);
  const [isModalCreate, setIsModalCreate] = useState(false);

  const dispatch = useDispatch();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const showConfirm = (id) => {
    confirm({
      title: 'Do you Want to delete this user?',
      icon: <ExclamationCircleFilled />,
      content: 'Are You Sure',
      onOk() {
        console.log('OK');
        dispatch(deleteUser(user?._id));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{email}</TableCell>

        <TableCell>{company || '--'}</TableCell>

        <TableCell>
          {role[0] === '659fc0a4ffce71a158f125f0'
            ? 'User'
            : role[0] === '659fc0a4ffce71a158f125ed'
            ? 'Admin'
            : 'Super Admin'}
        </TableCell>

        <TableCell align="center">{isVerified ? 'Yes' : 'Yes'}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem
          onClick={() => {
            setIsModalCreate(true);
            handleCloseMenu();
          }}
        >
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            showConfirm();
            handleCloseMenu();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <AddUser
        open={isModalCreate}
        handleClose={setIsModalCreate}
        isEdit={true}
        id={user?.id}
        user={user}
      />
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
