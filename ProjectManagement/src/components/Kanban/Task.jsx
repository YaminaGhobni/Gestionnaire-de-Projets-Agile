import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import { Box, Paper, Card, Menu, Button, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import EditForm from './EditForm';
import useToggle from './useToggleState';
import { bgBlur } from '../../theme/css';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

const Task = ({ id, task, color, index, removeTask, editTask }) => {
  const [isEditing, toggle] = useToggle(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();

  return (
    <Draggable draggableId={`${task.id}`} index={index}>
      {(provided, snapshot) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // onClick={openDetails.onTrue}
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
            // ...(openDetails.value && {
            //   boxShadow: theme.customShadows.z20,
            // }),
            ...(snapshot.isDragging && {
              boxShadow: theme.customShadows.z20,
              ...bgBlur({
                opacity: 0.48,
                color: theme.palette.background.default,
              }),
            }),
            //   ...sx,
          }}
        >
          {isEditing ? (
            <EditForm
              color={color}
              editTask={editTask}
              taskId={task.id}
              toggle={toggle}
              startTitle={task.title}
              startText={task.text}
            />
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div>
                  <span>{task.title}</span>
                </div>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                {/* <IconButton id="basic-button" onClick={handleClick}>
                  <MoreHorizIcon />
                </IconButton> */}
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
                      // startIcon={<EditIcon fontSize="small" />}
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
                      // startIcon={<DeleteIcon fontSize="small" />}
                      onClick={() => removeTask(task?.id)}
                    >
                      Delete
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Paper>
      )}
    </Draggable>
  );
};

export default Task;

Task.propTypes = {
  id: PropTypes.any,
  task: PropTypes.any,
  color: PropTypes.any,
  index: PropTypes.any,
  removeTask: PropTypes.any,
  editTask: PropTypes.any,
};
