import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import { IoIosTrash } from "react-icons/io";
import { getRepeatIndex } from "../helpers";
import { v4 } from "uuid";
import "./add-repeat.component.scss";

const AddRepeat = () => {
  const dispatch = useDispatch();
  const { toggleRepeatsForm, setUserExercises } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const { forms, date, userExercises } = useSelector((state) => state);
  const { full_date } = date;

  const { show, repeatId, currentExerciseID, actionType } = forms.repeatsForm;

  const current_exs = userExercises[full_date];
  const [targetExercise] = current_exs?.filter(
    (exercise) => exercise.id === currentExerciseID
  );

  const repeat_length = targetExercise?.repeats?.length;
  const repeat_number =
    actionType === "add"
      ? (repeat_length ? repeat_length : 0) + 1
      : getRepeatIndex(targetExercise, repeatId) + 1;

  const cleanFields = (e) => {
    e.target[0].value = "";
    e.target[1].value = "";
  };

  const deleteRepeat = (currentExerciseId, currentRepeatId) => {
    const all_current_ex = [...current_exs];

    const [current_user_ex] = [
      ...all_current_ex.filter((exercise) => exercise.id === currentExerciseId),
    ];

    const current_user_repeats = current_user_ex.repeats;

    const new_user_repeats = current_user_repeats?.filter(
      (repeat) => repeat.id !== currentRepeatId
    );

    current_user_ex.repeats = new_user_repeats;

    const newState = {
      ...userExercises,
      [full_date]: [
        ...current_exs.filter((ex) => ex.id !== currentExerciseId),
        current_user_ex,
      ],
    };
    setUserExercises(newState);
  };

  const generateRepeatsArray = (e, targetExercise, repeatId) => {
    const new_repeat = {
      id: repeatId,
      weight: e.target[0].value,
      repeats: e.target[1].value,
    };

    if (targetExercise.repeats) {
      const old_repeats = targetExercise.repeats;
      const exist_check = old_repeats?.some(
        (repeat) => repeat?.id === repeatId
      );

      if (exist_check) {
        const new_repeats = old_repeats.map((repeat) =>
          repeat.id !== new_repeat.id ? repeat : new_repeat
        );

        return new_repeats;
      } else {
        old_repeats.push(new_repeat);
        cleanFields(e);

        return old_repeats;
      }
    } else {
      cleanFields(e);

      return [new_repeat];
    }
  };

  const onSubmit = (e, exerciseID, repeatID) => {
    e.preventDefault();
    const target_exercise = {
      ...current_exs.filter((exercise) => exercise.id === exerciseID),
    }[0];

    let repeat_id;
    if (repeatID) {
      repeat_id = repeatID;
    } else {
      repeat_id = v4().slice(0, 8);
    }

    const new_repeat_data = {
      repeats: generateRepeatsArray(e, target_exercise, repeat_id),
    };

    const ex_with_repeats = Object.assign(target_exercise, new_repeat_data);
    const new_exercises = {
      date: full_date,
      exercises: [
        ...current_exs.map((ex) =>
          ex.id !== exerciseID ? ex : ex_with_repeats
        ),
      ],
    };
    setUserExercises(new_exercises);
  };

  return show ? (
    <form
      className="submit-form"
      id="submit-form"
      action="submit"
      onSubmit={(e) => {
        onSubmit(e, currentExerciseID, repeatId);
        toggleRepeatsForm();
      }}
    >
      <div className="submit--form__header text--selection__none">
        <p className="form--label">Repeat №{repeat_number}</p>
        <IoIosTrash
          className="delete--repeat"
          onClick={() => {
            deleteRepeat(currentExerciseID, repeatId);
            toggleRepeatsForm();
          }}
        />
      </div>
      <input
        type="number"
        className="input"
        placeholder="Weight"
        id="weight--field"
      />
      <input
        type="number"
        className="input"
        placeholder="Repeats"
        id="repeats--field"
      />
      <div className="repeats--buttons">
        <input type="submit" className="save-btn" value="Save " />
        <input
          type="button"
          className="cancel-btn"
          value="Cancel"
          onClick={() => toggleRepeatsForm()}
        />
      </div>
    </form>
  ) : (
    <></>
  );
};

export default AddRepeat;
