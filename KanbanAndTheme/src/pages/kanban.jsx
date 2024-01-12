import { Helmet } from 'react-helmet-async';

import Kanban from 'src/components/Kanban/Kanban';

// ----------------------------------------------------------------------

export default function KanbanPage() {
  return (
    <>
      <Helmet>
        <title> Kanban </title>
      </Helmet>
      <Kanban />
    </>
  );
}
