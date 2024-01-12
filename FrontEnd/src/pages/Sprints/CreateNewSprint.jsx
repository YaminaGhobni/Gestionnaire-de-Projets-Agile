import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Container, Typography } from '@mui/material';

import SprintNewEditForm from './SprintNewEditForm';

// ----------------------------------------------------------------------

const createNewSprint = () => (
  <>
    <Helmet>
      <title> Sprint: Create a new sprint</title>
    </Helmet>

    <Container>
      <Typography variant="h4" mb={3}>
        Create a new sprint
      </Typography>

      <SprintNewEditForm isEdit={false} currentSprint={{ name: 'xsx' }} />
    </Container>
  </>
);

export default createNewSprint;
