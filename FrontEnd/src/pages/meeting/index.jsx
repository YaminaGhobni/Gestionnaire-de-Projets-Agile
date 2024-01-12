import { Helmet } from 'react-helmet-async';
import MeetingView from './user-view';

// ----------------------------------------------------------------------

export default function MeetingPage() {
  return (
    <>
      <Helmet>
        <title> Meeting Management </title>
      </Helmet>
      <MeetingView />
    </>
  );
}
