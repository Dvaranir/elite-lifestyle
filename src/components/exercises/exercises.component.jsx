import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";

import {
  checkForDublicates,
  checkOnclickElement,
  addRemoveExercise,
} from "../helpers";

import SearchBar from "../search/search.component";
import ExerciseCard from "../exercise-card/exercise_card.component";

const filterExercise = (exercises, filter) => {
  // eslint-disable-next-line array-callback-return
  const filteredResult = exercises.filter((el) => {
    try {
      return (
        el.exercise_name.toLowerCase().includes(filter.toLowerCase()) ||
        el.body_part.toLowerCase().includes(filter.toLowerCase()) ||
        el.equipment_type.toLowerCase().includes(filter.toLowerCase())
      );
    } catch (error) {
      console.log(error);
    }
  });

  return filteredResult;
};

const Exercises = () => {
  const dispatch = useDispatch();
  const { setUserExercises } = bindActionCreators(actionCreators, dispatch);

  const { search, exercises, userExercises, date } = useSelector(
    (state) => state
  );
  const { full_date } = date;
  const user_exercises = userExercises[full_date];

  const filteredExercises = filterExercise(exercises, search);

  const exerciseOnclick = (e) => {
    const btnClass = "btn__component";
    try {
      if (!checkOnclickElement(e, btnClass, [btnClass])) return;

      setUserExercises(
        addRemoveExercise(e, exercises, userExercises[full_date], full_date)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const renderExercise = (exercise, observed_exercise) => {
    try {
      const { id } = exercise;

      const btn_name = checkForDublicates(id, exercises, user_exercises)
        ? "IoIosClose"
        : "IoIosAdd";

      return (
        <ExerciseCard
          key={id}
          exercise={exercise}
          btnName={btn_name}
          observe={observed_exercise}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  const observed_exercise = useRef();

  const observer_options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const OptimizeRender = ([entry]) => {
    console.log(entry);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(OptimizeRender, observer_options);
    if (observed_exercise.current) observer.observe(observed_exercise.current);
    return () => {
      if (observed_exercise.current)
        observer.unobserve(observed_exercise.current);
    };
  });

  return (
    <section className="exercise--search__section">
      <SearchBar placeholder="Search" />
      <div
        className="exercise--cards"
        onClick={(e) => {
          exerciseOnclick(e);
        }}
      >
        {filteredExercises.map((exercise) =>
          renderExercise(exercise, observed_exercise)
        )}
      </div>
    </section>
  );
};

export default Exercises;
