import React from 'react';
import PropTypes from 'prop-types';

import { Droppable } from 'react-beautiful-dnd';
import { Box, Paper, Button, Typography, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';

import Task from './Task';
import Scrollbar from '../scrollbar';
import Iconify from '../iconify';

const Column = ({ columnData, openModal, removeTask, removeColumn, editTask }) => {
  const columnTitle = `${columnData.name} (${columnData.taskIds.length})`;

  return (
    <Box sx={{ width: '500px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          mb: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: '12px',
            backgroundColor: `${columnData.color}`,
            fontWeight: 'bold',
            color: 'white',
            p: 1,
            borderRadius: '5px',
            zIndex: 1,
            ml: 1,
          }}
        >
          {columnTitle}
        </Typography>
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            removeColumn(columnData.id);
          }}
        >
          <Iconify icon="material-symbols:delete" />
        </IconButton>
      </Box>

      <Droppable droppableId={`${columnData.id - 1}`} type="COLUMN">
        {(provided, snapshot) => (
          <Scrollbar
            sx={{
              height: 1,
              minHeight: {
                xs: '80vh',
                md: 'unset',
              },
            }}
          >
            <Paper
              ref={provided.innerRef}
              {...provided.draggableProps}
              sx={{
                px: 2,
                borderRadius: 2,
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                bgcolor: 'background.neutral',
                ...(snapshot.isDragging && {
                  bgcolor: (theme) => alpha(theme.palette.grey[500], 0.24),
                }),
              }}
            >
              {columnData.taskIds.map((task, index) => (
                <Task
                  key={task.id}
                  id={task.id}
                  task={task}
                  color={columnData.color}
                  index={index}
                  removeTask={removeTask}
                  editTask={editTask}
                />
              ))}
              {provided.placeholder}
              <Box sx={{ pt: 2 }}>
                <Button
                  sx={{
                    color: '#aaa',
                    textTransform: 'none',
                    ':hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                  onClick={() => openModal(columnData)}
                  disabled={columnData.taskIds.length >= 5}
                  startIcon={<Iconify icon="ic:baseline-plus" />}
                >
                  New
                </Button>
              </Box>
            </Paper>
          </Scrollbar>
        )}
      </Droppable>
    </Box>
  );
};
export default Column;

Column.propTypes = {
  columnData: PropTypes.string,
  openModal: PropTypes.bool,
  removeTask: PropTypes.bool,
  removeColumn: PropTypes.bool,
  editTask: PropTypes.bool,
};
