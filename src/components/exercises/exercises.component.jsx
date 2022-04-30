import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";

import "./exercises.component.scss";

import {
  checkForDublicates,
  checkOnclickElement,
  addRemoveExercise,
} from "../helpers";

import Loading from "../loading/loading.component";
import SearchBar from "../search/search.component";
import ExerciseCard from "../exercise-card/exercise_card.component";
import { fetchExercises } from "../../state/action-creators";

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

// Narrowing render list to uptimize render
const optimizeRender = (listToOptimize, rendersPerStep, step) => {
  return listToOptimize.slice(0, rendersPerStep * step);
};

const Exercises = () => {
  const dispatch = useDispatch();
  const { setUserExercises, setExercisesStep, setSearch } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const { search, exercises, userExercises, date, exercisesStep } = useSelector(
    (state) => state
  );
  const { full_date } = date;
  const user_exercises = userExercises[full_date];

  const filteredExercises = filterExercise(exercises, search);
  const exercises_to_render = optimizeRender(
    filteredExercises,
    50,
    exercisesStep
  );

  // Adding or removing exercise if it is already in the user list
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

  const checkIntersection = ([entry]) => {
    if (entry.isIntersecting) return setExercisesStep(exercisesStep + 1);
  };

  const observed_exercise = useRef();

  const observer_options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.7,
  };

  // Renders loading component if exercises state empty
  // Or renders 'nothing found' element if user search have no any result
  const checkAvailability = () => {
    if (!exercises_to_render?.[0] && search)
      return (
        <div className="not--found">
          <p>Nothing found</p>
        </div>
      );
    else return <Loading />;
  };

  // Observer implementation to optimize render to reduce CPU and Ram load
  // This is achieved by lazy loading while scrolling to observed element.
  useEffect(() => {
    const observer = new IntersectionObserver(
      checkIntersection,
      observer_options
    );
    if (observed_exercise.current) observer.observe(observed_exercise.current);
    return () => {
      if (observed_exercise.current)
        observer.unobserve(observed_exercise.current);
    };
  });

  useEffect(() => {
    dispatch(fetchExercises());
    setExercisesStep(1);
    setSearch("");
  }, []);

  return (
    <section className="exercise--search__section">
      <SearchBar placeholder="Search" />
      <div
        className="exercise--cards"
        onClick={(e) => {
          exerciseOnclick(e);
        }}
      >
        {exercises_to_render?.[0]
          ? exercises_to_render.map((exercise) =>
              renderExercise(exercise, observed_exercise)
            )
          : checkAvailability()}
      </div>
    </section>
  );
};

export default Exercises;
