import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import { Box, Paper, IconButton, Card, Stack, Menu, Button, MenuItem, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';
import Badge from '@mui/material/Badge';

import EditForm from './EditForm';
import useToggle from './useToggleState';
import { bgBlur } from '../../theme/css';
import Iconify from '../iconify';
import Label from '../label';

const Task = ({ id, task, color, index, removeTask, editTask }) => {
  const [isEditing, toggle] = useToggle(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
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
  return (
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
            p: isEditing ? 0 : 2,
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
          <Label color={(task.status === 'low' && 'warning') || 'success'}>{task.status}</Label>
          {isEditing ? (
            <EditForm
              color={color}
              editTask={editTask}
              taskId={task.id}
              toggle={toggle}
              startTitle={task.title}
              startText={task.text}
              handleClose={handleClose}
            />
          ) : (
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
                      onClick={toggle}
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
          )}
          {renderInfo}
        </Paper>
      )}
    </Draggable>
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
