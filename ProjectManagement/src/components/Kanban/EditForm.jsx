import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Button, TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import useInputState from './useInputState';

const EditForm = ({ color, editTask, taskId, toggle, startTitle, startText, handleClose }) => {
  const [text, setText] = useState(<p>{startText}</p>);
  useEffect(() => {
    setText(startText);
  }, [startText]);

  const [title, handleChangeTitle] = useInputState(startTitle);
  const onChange = (e) => {
    setText(e);
  };
  const myToolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['image'], // add image here
  ];
  return (
    <Box
      sx={{
        p: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
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
        {/* <TextField
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
        /> */}
        <ReactQuill
          theme="snow"
          value={text}
          modules={{ toolbar: myToolbar }}
          onChange={onChange}
        />
        {/* <Button
          sx={{
            backgroundColor: 'transparent',
            color: '#aaa',
            ':hover': { bgcolor: 'transparent' },
          }}
          type="submit"
          handleClose={handleClose}
        >
          Save
        </Button> */}
      </form>
    </Box>
  );
};

export default EditForm;

EditForm.propTypes = {
  color: PropTypes.string,
  editTask: PropTypes.bool,
  taskId: PropTypes.number,
  toggle: PropTypes.bool,
  startTitle: PropTypes.bool,
  startText: PropTypes.bool,
  handleClose: PropTypes.func,
};
