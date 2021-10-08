import React from 'react';
import { Switch, Route } from 'react-router';

import HomePage from './pages/homepage/homepage.component';
import WorkoutPage from './pages/workoutpage/workout.component';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/workout" component={WorkoutPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
