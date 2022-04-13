import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import { useEffect } from "react";

import SearchBar from "../../components/search/search.component";
import Calendar from "../../components/calendar/calendar.component";
import ExerciseCard from "../../components/exercise_card/exercise_card.component";
import UserExercises from "../../components/user-exercises/user-exercises.component";
import AddRepeat from "../../components/add-repeat/add-repeat.component";

import "./workout.styles.scss";

const checkForDublicates = (id, exercises, userExercises) => {
  if (!userExercises) return false;
  const clicked_exercise = exercises.filter((ex) => ex.id.includes(id));
  const check_for_dublicates = userExercises.filter((ex) => ex.id.includes(id));

  return (
    JSON.stringify(check_for_dublicates[0]?.id) ===
    JSON.stringify(clicked_exercise[0]?.id)
  );
};

const addRemoveExercise = (e, exercises, userExercises, full_date) => {
  // Select target exercise card id
  const id_exercise_to_add = e.target.closest(".exercise--card").id;
  // Select clicked exercise
  const clicked_exercise = exercises.filter((ex) =>
    ex.id.includes(id_exercise_to_add)
  );

  // Check for exercise dublicate
  if (checkForDublicates(id_exercise_to_add, exercises, userExercises)) {
    return {
      date: full_date,
      exercises: [
        ...userExercises.filter(
          (exercise) => exercise.id !== clicked_exercise[0].id
        ),
      ],
    };
  } else if (Array.isArray(userExercises)) {
    return {
      date: full_date,
      exercises: [...new Set([...userExercises, ...clicked_exercise])],
    };
  } else {
    return {
      date: full_date,
      exercises: [...clicked_exercise],
    };
  }
};

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

const checkOnclickElement = (e, elementName, parentElNameList) => {
  const targetElName = e.target.classList.value;
  const parent_element = e.target?.parentElement?.classList?.value;
  const isTestPassed = parentElNameList.some(
    (element) => parent_element === element
  );
  if (elementName === targetElName || isTestPassed) return true;
};

const userExOnclick = (
  e,
  setUserExercises,
  exercises,
  userExercises,
  full_date,
  toggleRepeatsForm
) => {
  e.preventDefault();

  const btnClass = "btn__component";
  const addRepeatClass = "add--repeat__btn";
  const repeatsClass = "repeat";
  const parentsRepeatsClasses = [
    "repeat",
    "exercise--weight",
    "exercise--repeats",
  ];
  if (checkOnclickElement(e, btnClass, [btnClass])) {
    setUserExercises(
      addRemoveExercise(e, exercises, userExercises[full_date], full_date)
    );
  } else if (checkOnclickElement(e, addRepeatClass, [addRepeatClass])) {
    const repeat_data = { id: e.target.closest("article").id, repeatId: "" };
    console.log("Plus");
    toggleRepeatsForm(repeat_data);
  } else if (checkOnclickElement(e, repeatsClass, parentsRepeatsClasses)) {
    console.log("Element");
    const repeat_data = {
      id: e.target.closest("article").id,
      repeatId: e.target.closest(".repeat").id,
    };

    toggleRepeatsForm(repeat_data);
  }
};

const exerciseOnclick = (
  e,
  setUserExercises,
  exercises,
  userExercises,
  full_date
) => {
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

const WorkoutPage = () => {
  const dispatch = useDispatch();
  const {
    setSearch,
    fetchExercises,
    setUserExercises,
    toggleRepeatsForm,
    hideRepeatsForm,
  } = bindActionCreators(actionCreators, dispatch);

  const { search, exercises, userExercises, date } = useSelector(
    (state) => state
  );
  const { full_date } = date;

  useEffect(() => {
    try {
      hideRepeatsForm();
      dispatch(fetchExercises());
    } catch (error) {}
  }, []);

  const filteredExercises = filterExercise(exercises, search);

  try {
    return (
      <section className="workout--section">
        <AddRepeat />
        <section
          className="user--exercises"
          onClick={(e) => {
            userExOnclick(
              e,
              setUserExercises,
              exercises,
              userExercises,
              full_date,
              toggleRepeatsForm
            );
          }}
        >
          <UserExercises />
        </section>

        <Calendar />

        <section className="calendar--search__container">
          <section className="exercise--search__section">
            <SearchBar placeholder="Search" setSearch={setSearch} />
            <div
              className="exercise--cards"
              onClick={(e) => {
                exerciseOnclick(
                  e,
                  setUserExercises,
                  exercises,
                  userExercises,
                  full_date
                );
              }}
            >
              {/* Add exersice to user exercises list */}
              {filteredExercises.map((exercise) => {
                try {
                  return (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      btnName={`${
                        checkForDublicates(
                          exercise.id,
                          exercises,
                          userExercises[full_date]
                        )
                          ? "IoIosClose"
                          : "IoIosAdd"
                      }`}
                    />
                  );
                } catch (error) {
                  console.log(error);
                }
              })}
            </div>
          </section>
        </section>
      </section>
    );
  } catch {}
};

export default WorkoutPage;
