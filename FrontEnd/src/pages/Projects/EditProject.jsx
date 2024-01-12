import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Container, Typography } from '@mui/material';

import ProjectNewEditForm from './ProjectNewEditForm';

// ----------------------------------------------------------------------

const createNewProject = () => (
  <>
    <Helmet>
      <title> Project: Edit project</title>
    </Helmet>

    <Container>
      <Typography variant="h4" mb={3}>
        Edit project
      </Typography>

      <ProjectNewEditForm isEdit currentProject={{ name: 'xsx' }} />
    </Container>
  </>
);

export default createNewProject;
