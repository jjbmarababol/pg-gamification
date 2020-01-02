import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BasePage } from './components/base';

const App: React.FC = () => {
  return (
    <Router>
      <BasePage/>
    </Router>
  );
}

export default App;
