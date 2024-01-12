import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));

export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Kanban = lazy(() => import('src/pages/kanban'));

export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Projects = lazy(() => import('src/pages/Projects'));
export const CreateProject = lazy(() => import('src/pages/Projects/CreateNewProject'));
export const ViewProject = lazy(() => import('src/pages/Sprints'));

// export const Sprints = lazy(() => import('src/pages/Sprints'));
export const CreateSprint = lazy(() => import('src/pages/Sprints/CreateNewSprint'));
export const ViewSprint = lazy(() => import('src/pages/Sprints/ViewSprint'));

import MeetingPage from 'src/pages/meeting';
import MeetingForm from 'src/pages/meeting/MeetingForm';
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
        { path: '/kanban', element: <Kanban /> },
        { path: 'user', element: <UserPage /> },

        { path: 'meeting', element: <MeetingPage /> },
        { path: 'meeting/create', element: <MeetingForm /> },
        { path: 'meeting/:id/edit', element: <MeetingForm /> },
        {
          path: 'projects',
          element: <Projects />,
        },
        {
          path: 'projects/new',
          element: <CreateProject />,
        },
        {
          path: 'projects/edit/:name',
          element: <CreateProject />,
        },
        {
          path: 'projects/view/:id',
          element: <ViewProject />,
        },
        // {
        //   path: 'sprints',
        //   element: <Sprints />,
        // },
        {
          path: 'sprints/new',
          element: <CreateSprint />,
        },
        {
          path: 'sprints/edit/:name',
          element: <CreateSprint />,
        },
        {
          path: 'sprints/view/:id',
          element: <ViewSprint />,
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
