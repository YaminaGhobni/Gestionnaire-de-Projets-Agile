import React from 'react';
import { Helmet } from 'react-helmet-async';

import { SprintView } from '../../sections/sprint/view';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';

const Sprints = () => {
  const location = useLocation();

  const name = location.state?.name;
  return (
    <>
      <Helmet>
        <title> Sprints </title>
      </Helmet>
      <Typography
        mb={3}
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={2}
        justifyContent="center"
      >
        <h2> Project Name:</h2> <h3 style={{ color: '#1877F2' }}>{name}</h3>
      </Typography>

      <SprintView />
    </>
  );
};

export default Sprints;
