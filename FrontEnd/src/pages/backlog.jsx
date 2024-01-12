import { Helmet } from 'react-helmet-async';

import { BacklogView } from 'src/sections/backlog/view';

// ----------------------------------------------------------------------

export default function BacklogPage() {
  return (
    <>
      <Helmet>
        <title> Backlog   </title>
      </Helmet>

      <BacklogView />
    </>
  );
}
