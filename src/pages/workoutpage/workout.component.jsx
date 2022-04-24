import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import { useEffect } from "react";

import Calendar from "../../components/calendar/calendar.component";
import UserExercises from "../../components/user-exercises/user-exercises.component";

import Exercises from "../../components/exercises/exercises.component";

import "./workout.styles.scss";

const WorkoutPage = () => {
  const dispatch = useDispatch();
  const { fetchExercises, hideRepeatsForm } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const { date } = useSelector((state) => state);
  const { full_date } = date;

  useEffect(() => {
    try {
      hideRepeatsForm();
      dispatch(fetchExercises());
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    hideRepeatsForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full_date]);

  return (
    <section className="workout--section">
      <UserExercises />

      <Calendar />

      <Exercises />
    </section>
  );
};

export default WorkoutPage;
