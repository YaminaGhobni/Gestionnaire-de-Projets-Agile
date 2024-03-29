import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import MeetingPage from 'src/pages/meeting';
import MeetingForm from 'src/pages/meeting/meetingForm';
export const BacklogPage = lazy(() => import('src/pages/backlog'));
export const BacklogCreatePage = lazy(() => import('src/pages/backlogCreatePage'));

export const IndexPage = lazy(() => import('src/pages/app'));

export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));

export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'meeting', element: <MeetingPage /> },
        { path: 'meeting/create', element: <MeetingForm /> },
        { path: 'meeting/:id/edit', element: <MeetingForm /> },
        {
          path: 'backlog',
          children: [
            { element: <Navigate to="/backlog/list" replace />, index: true },
            { path: 'list', element: <BacklogPage /> },
            { path: 'new', element: <BacklogCreatePage /> },
            { path: 'edit', element: <BacklogCreatePage /> },
          ],
        },
      ],
    },

    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
