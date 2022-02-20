import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/index';
import { useEffect } from 'react';
import SearchBar from '../../components/search/search.component';
import Calendar from '../../components/calendar/calendar.component';
import ExerciseCard from '../../components/exercise_card.component/exercise_card.component';
import './workout.styles.scss';

const checkForDublicates = (id, exercises, userExercises) => {
  const clicked_exercise = exercises.filter(ex => ex.id.includes(id));
  const check_for_dublicates = userExercises.filter(ex => ex.id.includes(id));

  return clicked_exercise[0] === check_for_dublicates[0];
};

const addRemoveExercise = (e, exercises, userExercises, setUserExercises) => {
  if (
    e.target.classList.value !== 'btn__component' &&
    e.target.parentElement.classList.value !== 'btn__component'
  )
    return false;

  const id_exercise_to_add = e.target.closest('.exercise--card').id;

  const clicked_exercise = exercises.filter(ex =>
    ex.id.includes(id_exercise_to_add)
  );

  if (checkForDublicates(id_exercise_to_add, exercises, userExercises)) {
    setUserExercises(
      userExercises.filter(ex => !ex.id.includes(id_exercise_to_add))
    );
  } else {
    setUserExercises([...userExercises, ...clicked_exercise]);
  }
};

const WorkoutPage = () => {
  const dispatch = useDispatch();
  const { setDate, setSearch, fetchExercises, setUserExercises } =
    bindActionCreators(actionCreators, dispatch);

  const { date, search, exercises, userExercises } = useSelector(
    state => state
  );

  useEffect(() => {
    try {
      dispatch(fetchExercises());
      console.log(exercises);
    } catch (error) {}
  }, []);

  const filterExercise = (exercises, filter) => {
    const filteredResult = exercises.filter(el => {
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

  const filteredExercises = filterExercise(exercises, search);

  try {
    return (
      <section className="workout--section">
        <section
          className="user--exercises"
          onClick={e =>
            addRemoveExercise(e, exercises, userExercises, setUserExercises)
          }
        >
          {userExercises[0] ? (
            userExercises.map(exercise => {
              return (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  btnName="IoIosClose"
                />
              );
            })
          ) : (
            <div className="user--exercises__placeholder">
              Add some exercises
            </div>
          )}
        </section>

        <Calendar date={{ ...date }} setDate={setDate} />

        <section className="calendar--search__container">
          <section className="exercise--search__section">
            <SearchBar placeholder="Search" setSearch={setSearch} />
            <div
              className="exercise--cards"
              onClick={e => {
                try {
                  addRemoveExercise(
                    e,
                    exercises,
                    userExercises,
                    setUserExercises
                  );
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {filteredExercises.map(exercise => {
                return (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    btnName={`${
                      checkForDublicates(exercise.id, exercises, userExercises)
                        ? 'IoIosClose'
                        : 'IoIosAdd'
                    }`}
                  />
                );
              })}
            </div>
          </section>
        </section>
      </section>
    );
  } catch {}
};

export default WorkoutPage;
