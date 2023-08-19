import React from 'react';
import ReactDOM from 'react-dom/client';
import AddTeam from './assets/pages/AddTeam.tsx';
import ViewTeam from './assets/pages/ViewTeam.tsx';
import AddEvent from './assets/pages/AddEvent.tsx';
import ViewEvent from './assets/pages/ViewEvent.tsx';
import AddProject from './assets/pages/AddProject.tsx';
import ViewProject from './assets/pages/ViewProject.tsx';
import UserPage from './assets/pages/UserPage.tsx';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react';
import Protected from './assets/access/Protected.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode="dark" />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/team/view" element={<Protected><ViewTeam /></Protected>} />
          <Route path="/team/add" element={<Protected><AddTeam /></Protected>} />
          <Route path="/event/add" element={<Protected><AddEvent /></Protected>} />
          <Route path="/event/view" element={<Protected><ViewEvent /></Protected>} />
          <Route path="/project/add" element={<Protected><AddProject /></Protected>} />
          <Route path="/project/view" element={<Protected><ViewProject /></Protected>} />
        </Routes>

      </BrowserRouter>

    </ChakraProvider>
  </React.StrictMode>
);
