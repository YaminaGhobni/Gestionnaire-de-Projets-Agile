import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Container, Typography } from '@mui/material';

import SprintNewEditForm from './SprintNewEditForm';

// ----------------------------------------------------------------------

const createNewSprint = () => (
  <>
    <Helmet>
      <title> Sprint: Edit sprint</title>
    </Helmet>

    <Container>
      <Typography variant="h4" mb={3}>
        Edit sprint
      </Typography>

      <SprintNewEditForm isEdit currentSprint={{ name: 'xsx' }} />
    </Container>
  </>
);

export default createNewSprint;
