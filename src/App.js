import React from 'react';
import { Switch, Route } from 'react-router';

import Homepage from './pages/homepage/homepage.component';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
      </div>
    );
  }
}

export default App;
