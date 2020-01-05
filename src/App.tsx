import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BasePage } from './components/base';
import { Player } from './contexts';

const App: React.FC = () => {
  return (
    <Router>
      <Player>
        <BasePage/>
      </Player>
    </Router>
  );
}

export default App;
