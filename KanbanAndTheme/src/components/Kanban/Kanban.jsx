import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { Box, Button, Container, Stack } from '@mui/material';

import Iconify from '../iconify';
import Column from './Column';
import KanModal from './Modal';
import AddColumn from './AddColumn';
import { columnsRawData } from './Data';
import Task from './Task';

const Kanban = () => {
  const [openColModal, setOpenColModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState(columnsRawData);
  const [modal, setModal] = useState(false);

  // This function is called when a draggable item is dropped
  const onDragEnd = (result) => {
    const { destination, source } = result;

    // Check if there is no destination for the dropped item
    if (!destination) {
      return;
    }

    // Check if the item was dropped in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Get the source and destination columns based on droppableId
    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    // Check if the item is moved within the same column
    if (start === finish) {
      // Clone the taskIds array from the source column
      const newTaskIds = Array.from(start.taskIds);

      // Remove the item from its original position
      const swapTask = newTaskIds[source.index];
      newTaskIds.splice(source.index, 1);

      // Insert the item at the new position
      newTaskIds.splice(destination.index, 0, swapTask);

      // Update the state with the new task order in the same column
      const newColumnsState = columns.map((c) => {
        if (c.id === start.id) {
          c.taskIds = newTaskIds;
          return c;
        }
        return c;
      });

      // Clone the new state and update the state with the changes
      const newColumnsState2 = [...newColumnsState];
      setColumns(newColumnsState2);
    } else if (finish.taskIds.length < finish.limit) {
      // If the item is moved to a different column and the destination column has space

      // Clone taskIds from the source and destination columns
      const startTaskIds = Array.from(start.taskIds);
      const [item] = startTaskIds.splice(source.index, 1);

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, item);

      // Update the state with the new task order in both the source and destination columns
      const newColumnsState = columns.map((c) => {
        if (c.id === start.id) {
          c.taskIds = startTaskIds;
          return c;
        }
        if (c.id === finish.id) {
          c.taskIds = finishTaskIds;
          return c;
        }
        return c;
      });

      // Clone the new state and update the state with the changes
      const newColumnsState2 = [...newColumnsState];
      setColumns(newColumnsState2);
    }
  };

  const openModal = (data) => {
    const columnId = data.id;
    setModal(columnId);
    setOpen(true);
  };

  const closeModal = () => {
    setModal(false);
    setOpen(false);
  };
  const closeColModal = () => {
    setOpenColModal(false);
  };
  const [getColumnId, setGetColumnId] = useState('');
  const addTask = (newTask) => {
    setModal(false);

    const updatedColumns = columns.map((column) => {
      if (column.id === newTask.idColumn && column.taskIds.length < 5) {
        column.taskIds.push(newTask);
        return column;
      }
      return column;
    });
    setColumns(updatedColumns);
  };

  // Function to remove a task with a given taskId from the columns state
  const removeTask = (taskId) => {
    // Map through the columns and create a new array with updated taskIds
    const updatedColumns = columns
      .map((column) => ({
        ...column,
        ...{
          // Filter out the task with the given taskId from the column's taskIds
          taskIds: column.taskIds.filter((task) => task.id !== taskId),
        },
      }))
      // Filter out columns that have no tasks (taskIds.length >= 0)
      .filter((column) => column.taskIds.length >= 0);

    // Update the state with the new columns state excluding the removed task
    setColumns(updatedColumns);
  };

  const removeColumn = (columnId) => {
    const updatedColumns = columns.filter((item) => item.id !== columnId);
    setColumns(updatedColumns);
  };

  const editTask = (taskId, newTitle, newText) => {
    const updatedColumns = columns.map((column) => ({
      ...column,
      taskIds: column.taskIds.map((task) => {
        if (task.id === taskId) {
          task.title = newTitle;
          task.text = newText;
          return task;
        }
        return task;
      }),
    }));
    setColumns(updatedColumns);
  };

  const addColumn = (newColumn) => {
    setColumns([...columns, newColumn]);
  };
  const [openCreateTaskDrawer, setOpenCreateTaskDrawer] = useState(false);

  return (
    <Container
      sx={{
        height: 1,
      }}
      maxWidth={false}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <AddColumn
          openModal={openColModal}
          closeModal={closeColModal}
          addColumn={addColumn}
          columnId={columns.length + 1}
        />
        <Button
          sx={{
            color: '#000',
            backgroundColor: '#eee',
            textTransform: 'none',
            ':hover': {
              backgroundColor: '#ddd',
            },
            py: 1,
            my: 2,
          }}
          onClick={() => {
            setOpenColModal(true);
          }}
        >
          <Iconify icon="ic:baseline-plus" />
          Add New Column
        </Button>
        <Box>
          {openCreateTaskDrawer && (
            <Task
              isCreate
              key=""
              id=""
              task=""
              color=""
              index=""
              removeTask={() => {}}
              editTask={() => {}}
              columnData={columns}
              addTask={addTask}
              idColumn={getColumnId}
              openCreateTaskDrawer={openCreateTaskDrawer}
              setOpenCreateTaskDrawer={setOpenCreateTaskDrawer}
            />
          )}

          <Stack
            spacing={2}
            direction="row"
            sx={{
              p: 1,
              height: 1,
              maxWidth: '100%',
            }}
          >
            {columns.map((c) => (
              <Column
                columnData={c}
                columns={columns}
                setGetColumnId={setGetColumnId}
                key={c.name}
                openModal={openCreateTaskDrawer}
                removeTask={removeTask}
                removeColumn={removeColumn}
                editTask={editTask}
                setOpenCreateTaskDrawer={setOpenCreateTaskDrawer}
              />
            ))}
          </Stack>
        </Box>
      </DragDropContext>
    </Container>
  );
};

export default Kanban;
