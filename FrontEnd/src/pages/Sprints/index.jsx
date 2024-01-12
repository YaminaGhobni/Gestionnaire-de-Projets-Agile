import React from 'react';
import { Helmet } from 'react-helmet-async';

import { SprintView } from '../../sections/sprint/view';

const Sprints = () => {
  const x = 1;
  return (
    <>
      <Helmet>
        <title> Sprints </title>
      </Helmet>
      {x}

      <SprintView />
    </>
  );
};

export default Sprints;
