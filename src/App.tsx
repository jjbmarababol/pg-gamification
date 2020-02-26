import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BasePage } from './components/base';
import { Player, Match } from './contexts';

const App: React.FC = () => {
  return (
    <Router>
      <Player>
        <Match>
          <BasePage />
        </Match>
      </Player>
    </Router>
  );
};

export default App;
