import React from 'react';
import { Helmet } from 'react-helmet-async';

import { ProjectView } from '../../sections/project/view';

const Projects = () => (
  <>
    <Helmet>
      <title> Projects </title>
    </Helmet>

    <ProjectView />
  </>
);

export default Projects;
