import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";

import ExerciseCard from "../exercise-card/exercise_card.component";
import AddRepeat from "../add-repeat/add-repeat.component";

import {
  checkOnclickElement,
  addRemoveExercise,
} from "../../components/helpers";

// Adds repeats to user exercises and renders them
const UserExercises = () => {
  const dispatch = useDispatch();
  const { setUserExercises, toggleRepeatsForm } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const { userExercises, date, exercises } = useSelector((state) => state);
  const { full_date } = date;

  const user_exs = userExercises[full_date];
  const user_exs_exist = user_exs?.[0];

  const userExOnclick = (e) => {
    e.preventDefault();

    const btnClass = "btn__component";
    const addRepeatClass = "add--repeat__btn";
    const repeatsClass = "repeat";
    const parentsRepeatsClasses = [
      "repeat",
      "exercise--weight",
      "exercise--repeats",
    ];

    const show = e.target
      .closest(".repeat")
      ?.classList.value.includes("active--repeat");

    if (checkOnclickElement(e, btnClass, [btnClass])) {
      setUserExercises(addRemoveExercise(e, exercises, user_exs, full_date));
    } else if (checkOnclickElement(e, addRepeatClass, [addRepeatClass])) {
      const repeat_data = {
        id: e.target.closest("article").id,
        repeatId: "",
        actionType: "add",
      };
      toggleRepeatsForm(repeat_data);
    } else if (checkOnclickElement(e, repeatsClass, parentsRepeatsClasses)) {
      const exercise_id = e.target.closest("article").id;
      const repeat_id = e.target.closest(".repeat").id;

      const [current_exercise] = user_exs.filter(
        (exercise) => exercise.id === exercise_id
      );

      const [{ repeats, weight }] = current_exercise.repeats.filter(
        (repeat) => repeat.id === repeat_id
      );

      const repeat_data = {
        show: !show,
        id: exercise_id,
        repeatId: repeat_id,
        actionType: "modify",
        repeats: repeats,
        weight: weight,
      };

      toggleRepeatsForm(repeat_data);
    }
  };

  const renderExercises = (exercise) => {
    return (
      <ExerciseCard
        key={exercise.id}
        exercise={exercise}
        btnName="IoIosClose"
        userExerciseCard={true}
        userExercises={userExercises}
      />
    );
  };

  return (
    <>
      <AddRepeat />
      <section className="user--exercises" onClick={(e) => userExOnclick(e)}>
        {user_exs_exist ? (
          user_exs.map((exercise) => renderExercises(exercise))
        ) : (
          <div className="user--exercises__placeholder">Add some exercises</div>
        )}
      </section>
    </>
  );
};

export default UserExercises;
