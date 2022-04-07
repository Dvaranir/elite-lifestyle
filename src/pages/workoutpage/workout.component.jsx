import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import { useEffect } from "react";
import SearchBar from "../../components/search/search.component";
import Calendar from "../../components/calendar/calendar.component";
import ExerciseCard from "../../components/exercise_card/exercise_card.component";
import UserExercises from "../../components/user-exercises/user-exercises.component";
import "./workout.styles.scss";

const checkForDublicates = (id, exercises, userExercises) => {
  if (!userExercises) return false;
  const clicked_exercise = exercises.filter((ex) => ex.id.includes(id));
  const check_for_dublicates = userExercises.filter((ex) => ex.id.includes(id));

  return (
    JSON.stringify(clicked_exercise[0]) ===
    JSON.stringify(check_for_dublicates[0])
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

const WorkoutPage = () => {
  const dispatch = useDispatch();
  const { setSearch, fetchExercises, setUserExercises } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const { search, exercises, userExercises, date } = useSelector(
    (state) => state
  );
  const { full_date } = date;

  useEffect(() => {
    try {
      dispatch(fetchExercises());
    } catch (error) {}
  }, []);

  const filteredExercises = filterExercise(exercises, search);

  try {
    return (
      <section className="workout--section">
        <section
          className="user--exercises"
          onClick={(e) => {
            if (
              e.target.classList.value !== "btn__component" &&
              e.target.parentElement.classList.value !== "btn__component"
            )
              return;
            setUserExercises(
              addRemoveExercise(
                e,
                exercises,
                userExercises[full_date],
                full_date
              )
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
                try {
                  if (
                    e.target.classList.value !== "btn__component" &&
                    e.target.parentElement.classList.value !== "btn__component"
                  )
                    return;

                  setUserExercises(
                    addRemoveExercise(
                      e,
                      exercises,
                      userExercises[full_date],
                      full_date
                    )
                  );
                } catch (error) {
                  console.log(error);
                }
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
