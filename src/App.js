import React from 'react';
import { Routes, Route } from 'react-router';
import { useState, useEffect } from 'react';
import Menu_Items from './data/menu-items';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

import HomePage from './pages/homepage/homepage.component';
import WorkoutPage from './pages/workoutpage/workout.component';

import './App.scss';

const App = () => {
  const [menuItems, setMenuItems] = useState(Menu_Items);
  const [exercises, setExercises] = useState('');
  const [userExercises, setUserExercises] = useState([]);
  const [date, setDate] = useState({});
  const [search, setSearch] = useState('');

  async function getExercises() {
    let response = await fetch('http://127.0.0.1:5000/exercises');
    response = await response.json();
    // await response.map(res => setExercises({id: res['id']}));

    setExercises([...response]);
  }

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <div className="App">
      <Header {...menuItems} />
      <Routes>
        <Route exact path="/" element={<HomePage {...menuItems} />} />
        <Route
          exact
          path="/workout"
          element={
            <WorkoutPage
              date={date}
              setDate={setDate}
              search={search}
              setSearch={setSearch}
              exercises={[...exercises]}
              userExercises={userExercises}
              setUserExercises={setUserExercises}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
