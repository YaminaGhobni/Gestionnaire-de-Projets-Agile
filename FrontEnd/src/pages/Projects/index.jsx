import React from 'react';
import { Helmet } from 'react-helmet-async';

import { ProjectView } from '../../sections/project/view';

const Projects = () => {
  const x = 1;
  return (
    <>
      <Helmet>
        <title> Projects </title>
      </Helmet>
      {x}

      <ProjectView />
    </>
  );
};

export default Projects;
