import React from 'react';
import PropTypes from 'prop-types';

import { Droppable } from 'react-beautiful-dnd';
import { Box, Button, Typography, IconButton } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';

import Task from './Task';

const Column = ({ columnData, openModal, removeTask, removeColumn, editTask }) => (
  <Box>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Typography
        sx={{
          fontSize: '13px',
          backgroundColor: `${columnData.color}`,
          fontWeight: 'bold',
          color: columnData.color,
          p: 1,
          borderRadius: '5px',
          zIndex: 1,
          ml: 1,
        }}
      >
        {columnData.name} ({columnData.taskIds.length})
      </Typography>
      <IconButton
        sx={{ right: 20 }}
        onClick={(e) => {
          e.preventDefault();
          removeColumn(columnData.id);
        }}
      >
        delete
        {/* <DeleteIcon fontSize="small" /> */}
      </IconButton>
    </Box>
    <Droppable droppableId={`${columnData.id - 1}`}>
      {(provided, snapshot) => (
        <Box
          sx={{
            background: 'white',
            pt: 2,
            width: 340,
            px: 1,
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
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
        </Box>
      )}
    </Droppable>

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
        //   startIcon={<AddIcon />}
      >
        New
      </Button>
    </Box>
  </Box>
);
export default Column;

Column.propTypes = {
  columnData: PropTypes.any,
  openModal: PropTypes.any,
  removeTask: PropTypes.any,
  removeColumn: PropTypes.any,
  editTask: PropTypes.any,
};
