import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

// import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import { ConfirmDialog } from '../custom-dialog';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function KanbanDetailsToolbar({
  liked,
  onLike,
  taskName,
  onDelete,
  taskStatus,
  onCloseDetails,
}) {
  const smUp = useResponsive('up', 'sm');

  // const confirm = useBoolean();

  // const popover = usePopover();

  const [status, setStatus] = useState(taskStatus);

  //   const handleChangeStatus = useCallback(
  //     (newValue: string) => {
  //       popover.onClose();
  //       setStatus(newValue);
  //     },
  //     [popover]
  //   );

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          p: (theme) => theme.spacing(2.5, 1, 2.5, 2.5),
        }}
      >
        {!smUp && (
          <Tooltip title="Back">
            <IconButton onClick={onCloseDetails} sx={{ mr: 1 }}>
              <Iconify icon="eva:arrow-ios-back-fill" />
            </IconButton>
          </Tooltip>
        )}

        <Button
          size="small"
          variant="soft"
          endIcon={<Iconify icon="eva:arrow-ios-downward-fill" width={16} sx={{ ml: -0.5 }} />}
          //      onClick={popover.onOpen}
        >
          {status}
        </Button>

        <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
          <Tooltip title="Like">
            <IconButton color={liked ? 'default' : 'primary'} onClick={onLike}>
              <Iconify icon="ic:round-thumb-up" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete task">
            <IconButton
            // onClick={confirm.onTrue}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>

          <IconButton>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Stack>

      <ConfirmDialog
        //   open={confirm.value}
        //   onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {taskName} </strong>?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            // onClick={onDelete}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

KanbanDetailsToolbar.propTypes = {
  liked: PropTypes.number,
  onLike: PropTypes.number,
  taskName: PropTypes.string,
  onDelete: PropTypes.func,
  taskStatus: PropTypes.string,
  onCloseDetails: PropTypes.func,
};
