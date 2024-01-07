import React from 'react';
import PropTypes from 'prop-types';

import { v4 as uuid } from 'uuid';

import { Box, Modal, Button, TextField } from '@mui/material';

import useInputState from './useInputState';


const KanModal = ({ openModal, closeModal, addTask, columnData }) => {
  const [text, handleChangeText] = useInputState('');
  const [title, handleChangeTitle] = useInputState('');

  const idColumn = columnData;

  const newTask = {
    id: uuid(),
    text,
    idColumn,
    title,
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'white',
    boxShadow: 24,
    p: 2,
    borderRadius: 4,
    display: 'flex',

    justifyContent: 'center',
  };
  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box sx={style}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask(newTask);
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <TextField
            label="Title"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChangeTitle}
            required
            sx={{ m: 1, width: 400 }}
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            value={text}
            onChange={handleChangeText}
            name="task"
            id="task"
            sx={{ m: 1, width: 400 }}
          />
          <Button
            sx={{
              m: 1,
              color: '#aaa',
              bgcolor: 'transparent',
              width: 400,
              ':hover': { bgcolor: '#aaa', color: 'white' },
            }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default KanModal;

KanModal.propTypes = {
  openModal: PropTypes.any,
  closeModal: PropTypes.any,
  addTask: PropTypes.any,
  columnData: PropTypes.any,
};
