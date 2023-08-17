import React from 'react';
import ReactDOM from 'react-dom/client';
import AddTeam from './assets/pages/AddTeam.tsx';
import ViewTeam from './assets/pages/ViewTeam.tsx';
import AddEvent from './assets/pages/AddEvent.tsx';
import ViewEvent from './assets/pages/ViewEvent.tsx';
import AddProject from './assets/pages/AddProject.tsx';
import ViewProject from './assets/pages/ViewProject.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { ChakraProvider} from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react';
import Navbar from './assets/components/Navbar.tsx';


const router = createBrowserRouter([
  {
    path: '/team/add',
    element: <AddTeam />,
  },
  {
    path: '/team/view',
    element: <ViewTeam />,
  },
  {
    path: '/event/add',
    element: <AddEvent />,
  },
  {
    path: '/event/view',
    element: <ViewEvent />,
  },
  {
    path: '/project/add',
    element: <AddProject />,
  },
  {
    path: '/project/view',
    element: <ViewProject />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode="dark" />
      <Navbar />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
