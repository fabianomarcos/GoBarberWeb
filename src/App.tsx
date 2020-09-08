import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';

import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <Router>
        <Routes />
      </Router>
    </AuthProvider>

    <GlobalStyle />
  </>
);

export default App;
