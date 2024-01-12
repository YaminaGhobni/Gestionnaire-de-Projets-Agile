import randomColor from 'randomcolor';
import React, { useState } from 'react';

import { Box, Modal, Button, TextField } from '@mui/material';


// eslint-disable-next-line react/prop-types
const AddColumn = ({ openModal, closeModal, addColumn, columnId }) => {
  const [title, setTitle] = useState('');


  const newColumn = {
    id: columnId,
    name: title,
    limit: 10,
    color: randomColor({ luminosity: 'light' }),
    taskIds: [],
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    backgroundColor: 'white',
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
            addColumn(newColumn);
            closeModal();
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
            onChange={(e) => setTitle(e.target.value)}
            required
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
            Add New Column
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddColumn;
