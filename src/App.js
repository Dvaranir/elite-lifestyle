import React from "react";
import { Routes, Route } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import Menu_Items from "./data/menu-items";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import AddRepeat from "./components/add-repeat/add-repeat.component";

import HomePage from "./pages/homepage/homepage.component";
import WorkoutPage from "./pages/workoutpage/workout.component";

import "./App.scss";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index.js";

const App = () => {
  const dispatch = useDispatch();
  const { setMenuItems } = bindActionCreators(actionCreators, dispatch);

  setMenuItems(Menu_Items);
  const menuItems = useSelector((state) => state.menu);

  return (
    <div className="App">
      <Header {...menuItems} />
      <Routes>
        <Route exact path="/" element={<HomePage {...menuItems} />} />
        <Route exact path="/workout" element={<WorkoutPage />} />
        <Route exact path="/food" element={<AddRepeat />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
