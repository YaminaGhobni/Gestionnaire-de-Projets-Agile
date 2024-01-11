import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { useTheme, alpha, styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import {
  Box,
  Paper,
  IconButton,
  Card,
  Stack,
  Menu,
  Button,
  MenuItem,
  Avatar,
  Divider,
} from '@mui/material';

import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';
import Drawer from '@mui/material/Drawer';

import EditForm from './EditForm';
import useToggle from './useToggleState';
import { bgBlur } from '../../theme/css';
import Iconify from '../iconify';
import Label from '../label';
import KanbanDetailsToolbar from './kanbanDetailsToolbar';
import Scrollbar from '../scrollbar';
import KanbanDetailsPriority from './kanban-details-priority';

const Task = ({ id, task, color, index, removeTask, editTask }) => {
  const [isEditing, toggle] = useToggle(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const StyledLabel = styled('span')(({ theme }) => ({
    ...theme.typography.caption,
    width: 100,
    flexShrink: 0,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightSemiBold,
  }));
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerOpen = (event) => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => setOpenDrawer(false);

  const [priority, setPriority] = useState(task.priority);

  const theme = useTheme();
  const handleChangePriority = useCallback((newValue) => {
    setPriority(newValue);
  }, []);

  const renderReporter = (
    <Stack direction="row" alignItems="center">
      <StyledLabel>Reporter</StyledLabel>
      <Avatar alt={task.reporter.name} src={task.reporter.avatar} />
    </Stack>
  );

  const renderAssignee = (
    <Stack direction="row">
      <StyledLabel sx={{ height: 40, lineHeight: '40px' }}>Assignee</StyledLabel>

      <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1}>
        {task.assignee.map((user) => (
          <Avatar key={user.id} alt={user.name} src={user.avatarUrl} />
        ))}

        <Tooltip title="Add assignee">
          <IconButton
            // onClick={contacts.onTrue}
            sx={{
              bgcolor: (Theme) => alpha(Theme.palette.grey[500], 0.08),
              border: (Theme) => `dashed 1px ${Theme.palette.divider}`,
            }}
          >
            <Iconify icon="mingcute:add-line" />
          </IconButton>
        </Tooltip>

        {/* <KanbanContactsDialog
          assignee={task.assignee}
          open={contacts.value}
          onClose={contacts.onFalse}
        /> */}
      </Stack>
    </Stack>
  );

  const renderLabel = (
    <Stack direction="row">
      <StyledLabel sx={{ height: 24, lineHeight: '24px' }}>Labels</StyledLabel>

      {!!task.labels.length && (
        <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1}>
          {task.labels.map((label) => (
            <Chip key={label} color="info" label={label} size="small" variant="soft" />
          ))}
        </Stack>
      )}
    </Stack>
  );

  // const renderDueDate = (
  //   <Stack direction="row" alignItems="center">
  //     <StyledLabel> Due date </StyledLabel>

  //     {rangePicker.selected ? (
  //       <Button size="small" onClick={rangePicker.onOpen}>
  //         {rangePicker.shortLabel}
  //       </Button>
  //     ) : (
  //       <Tooltip title="Add due date">
  //         <IconButton
  //           onClick={rangePicker.onOpen}
  //           sx={{
  //             bgcolor: (Theme) => alpha(theme.palette.grey[500], 0.08),
  //             border: (Theme) => `dashed 1px ${theme.palette.divider}`,
  //           }}
  //         >
  //           <Iconify icon="mingcute:add-line" />
  //         </IconButton>
  //       </Tooltip>
  //     )}

  //     <CustomDateRangePicker
  //       variant="calendar"
  //       title="Choose due date"
  //       startDate={rangePicker.startDate}
  //       endDate={rangePicker.endDate}
  //       onChangeStartDate={rangePicker.onChangeStartDate}
  //       onChangeEndDate={rangePicker.onChangeEndDate}
  //       open={rangePicker.open}
  //       onClose={rangePicker.onClose}
  //       selected={rangePicker.selected}
  //       error={rangePicker.error}
  //     />
  //   </Stack>
  // );

  const renderPriority = (
    <Stack direction="row" alignItems="center">
      <StyledLabel>Priority</StyledLabel>
      <KanbanDetailsPriority priority={priority} onChangePriority={handleChangePriority} />
    </Stack>
  );

  const renderDescription = (
    <Stack direction="row">
      <StyledLabel> Description </StyledLabel>

      <EditForm
        color={color}
        editTask={editTask}
        taskId={task.id}
        toggle={toggle}
        startTitle={task.title}
        startText={task.text}
        handleClose={handleClose}
      />
    </Stack>
  );

  // const renderAttachments = (
  //   <Stack direction="row">
  //     <StyledLabel>Attachments</StyledLabel>
  //     {/* <KanbanDetailsAttachments attachments={task.attachments} /> */}
  //   </Stack>
  // );
  const renderInfo = (
    <Stack direction="row" alignItems="center">
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        sx={{
          typography: 'caption',
          color: 'text.disabled',
        }}
      >
        <Iconify width={16} icon="solar:chat-round-dots-bold" sx={{ mr: 0.25 }} />
        <Box component="span" sx={{ mr: 1 }}>
          {task.comments.length}
        </Box>

        <Iconify width={16} icon="eva:attach-2-fill" sx={{ mr: 0.25 }} />
        <Box component="span">{task.attachments.length}</Box>
      </Stack>

      <AvatarGroup
        sx={{
          [`& .${avatarGroupClasses.avatar}`]: {
            width: 24,
            height: 24,
          },
        }}
      >
        {task.assignee.map((user) => (
          <Avatar key={user.id} alt={user.name} src={user.avatar} />
        ))}
      </AvatarGroup>
    </Stack>
  );
  let statusColor;

  switch (task.status) {
    case 'inProgress':
      statusColor = 'warning';
      break;
    case 'done':
      statusColor = 'success';
      break;
    case 'noStatus': // added new status
      statusColor = 'info';
      break;
    default:
      statusColor = 'primary';
  }
  return (
    <>
      <Draggable draggableId={`${task.id}`} index={index}>
        {(provided, snapshot) => (
          <Paper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              width: 1,
              borderRadius: 1.5,
              overflow: 'hidden',
              position: 'relative',
              p: 2,
              bgcolor: 'background.default',
              boxShadow: theme.customShadows.z1,
              '&:hover': {
                boxShadow: theme.customShadows.z20,
              },
              ...(snapshot.isDragging && {
                boxShadow: theme.customShadows.z20,
                ...bgBlur({
                  opacity: 0.48,
                  color: theme.palette.background.default,
                }),
              }),
            }}
          >
            <Label color={statusColor}>{task.status}</Label>

            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: task.text }} />

                <IconButton
                  disableRipple
                  sx={{
                    mt: -3,
                    '&.MuiButtonBase-root:hover': {
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  <Iconify icon="ep:more" onClick={handleClick} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Button
                      startIcon={<Iconify icon="material-symbols:edit" />}
                      onClick={handleDrawerOpen}
                      sx={{
                        bgcolor: 'transparent',
                        color: '#aaa',
                        ':hover': { bgcolor: 'transparent' },
                      }}
                    >
                      Edit
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Button
                      sx={{
                        bgcolor: 'transparent',
                        color: '#aaa',
                        ':hover': { bgcolor: 'transparent' },
                      }}
                      startIcon={<Iconify icon="material-symbols:delete" />}
                      onClick={() => removeTask(task?.id)}
                    >
                      Delete
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            </>

            {renderInfo}
          </Paper>
        )}
      </Draggable>
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={() => handleClose()}
      >
        <Drawer
          anchor="right"
          slotProps={{
            backdrop: { invisible: true },
          }}
          PaperProps={{
            sx: {
              width: {
                xs: 1,
                sm: 480,
              },
            },
          }}
          open={openDrawer}
          onClose={handleDrawerClose}
        >
          <KanbanDetailsToolbar
            liked={5}
            onLike={() => {}}
            taskName={task.title}
            onDelete={() => {}}
            taskStatus={task.status}
            onCloseDetails={onclose}
          />

          <Divider />
          <Scrollbar
            sx={{
              height: 1,
              '& .simplebar-content': {
                height: 1,
                display: 'flex',
                flexDirection: 'column',
              },
            }}
          >
            <Stack
              spacing={3}
              sx={{
                pt: 3,
                pb: 5,
                px: 2.5,
              }}
            >
              {renderReporter}

              {renderAssignee}

              {renderLabel}

              {renderPriority}

              {renderDescription}

              {/* {renderAttachments} */}
            </Stack>

            {/* {!!task.comments
            .length && renderComments} */}
          </Scrollbar>
          <Button
            sx={{
              margin: '10px',
            }}
            variant="outlined"
            type="submit"
            handleClose={handleClose}
          >
            Save
          </Button>
        </Drawer>
      </ClickAwayListener>
    </>
  );
};

export default Task;

Task.propTypes = {
  id: PropTypes.number,
  task: PropTypes.any,
  color: PropTypes.string,
  index: PropTypes.number,
  removeTask: PropTypes.bool,
  editTask: PropTypes.bool,
};
