import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Container, Typography } from '@mui/material';

import ProjectNewEditForm from './ProjectNewEditForm';

// ----------------------------------------------------------------------

const createNewProject = () => (
  <>
    <Helmet>
      <title> Project: Create a new project</title>
    </Helmet>

    <Container>
      <Typography variant="h4" mb={3}>
        Create a new project
      </Typography>

      <ProjectNewEditForm isEdit={false} currentProject={{ name: 'xsx' }} />
    </Container>
  </>
);

export default createNewProject;
