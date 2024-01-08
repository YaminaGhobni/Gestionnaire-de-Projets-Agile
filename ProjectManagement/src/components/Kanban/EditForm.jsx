import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button, TextField } from '@mui/material';

import useInputState from './useInputState';

const EditForm = ({ color, editTask, taskId, toggle, startTitle, startText, handleClose }) => {
  const [text, handleChangeText] = useInputState(startText);
  const [title, handleChangeTitle] = useInputState(startTitle);
  return (
    <Box
      sx={{
        p: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editTask(taskId, title, text);
          toggle();
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          m: 0,
          p: 0,
          ':hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        {/* <TextField
          label="Title"
          required
          id="title"
          value={title}
          onChange={handleChangeTitle}
          sx={{ m: 1 }}
        /> */}
        <TextField
          sx={{ m: 1 }}
          type="text"
          value={text}
          label="Description"
          multiline
          rows={4}
          onChange={handleChangeText}
          name="task"
          id="task"
          variant="outlined"
        />
        <Button
          sx={{
            backgroundColor: 'transparent',
            color: '#aaa',
            ':hover': { bgcolor: 'transparent' },
          }}
          type="submit"
          handleClose={handleClose}
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default EditForm;

EditForm.propTypes = {
  color: PropTypes.any,
  editTask: PropTypes.any,
  taskId: PropTypes.any,
  toggle: PropTypes.any,
  startTitle: PropTypes.any,
  startText: PropTypes.any,
  handleClose: PropTypes.any,
};
