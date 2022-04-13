import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import { IoIosTrash } from "react-icons/io";
import "./add-repeat.component.scss";

const cleanFields = (e) => {
  e.target[0].value = "";
  e.target[1].value = "";
};

const generateRepeatsArray = (e, target_exercise, repeatId) => {
  const new_repeat = {
    id: repeatId,
    weight: e.target[0].value,
    repeats: e.target[1].value,
  };

  if (target_exercise.repeats) {
    const old_repeats = target_exercise.repeats;
    const exist_check = old_repeats?.some((repeat) => repeat?.id === repeatId);

    if (exist_check) {
      const existing_repeat = old_repeats?.filter(
        (repeat) => repeat?.id === repeatId
      );
      const exist_item_index = old_repeats.indexOf(existing_repeat[0]);

      old_repeats[exist_item_index] = new_repeat;

      return old_repeats;
    } else {
      old_repeats.push(new_repeat);
      cleanFields(e);
      console.log("New repeat");
      return old_repeats;
    }
  } else {
    cleanFields(e);
    return [new_repeat];
  }
};

const onSubmit = (e, currentDate, userExercises, exerciseID, repeatID) => {
  e.preventDefault();

  const target_exercise = {
    ...userExercises[currentDate].filter(
      (exercise) => exercise.id === exerciseID
    )[0],
  };

  let gen_repeat_id;
  if (repeatID) {
    gen_repeat_id = repeatID;
  } else if (target_exercise?.repeats) {
    gen_repeat_id =
      target_exercise.repeats.length + 1 + exerciseID.slice(0, 4) + currentDate;
  } else {
    gen_repeat_id = 1 + exerciseID.slice(0, 4) + currentDate;
  }

  const new_repeat_data = {
    repeats: generateRepeatsArray(e, target_exercise, gen_repeat_id),
  };

  const exerciseWithRepeats = Object.assign(target_exercise, new_repeat_data);

  const new_exercises = {
    date: currentDate,
    exercises: [
      ...userExercises[currentDate].filter(
        (exercise) => exercise.id !== exerciseID
      ),
      exerciseWithRepeats,
    ],
  };
  return new_exercises;
};

const AddRepeat = () => {
  const dispatch = useDispatch();
  const { toggleRepeatsForm, setUserExercises } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const { forms, date, userExercises } = useSelector((state) => state);
  const { full_date } = date;

  const { show, repeatId, currentExerciseID } = forms.repeatsForm;

  return show ? (
    <form
      className="submit-form"
      id="submit-form"
      action="submit"
      onSubmit={(e) =>
        setUserExercises(
          onSubmit(e, full_date, userExercises, currentExerciseID, repeatId)
        )
      }
    >
      <div className="submit--form__header">
        <p className="form--label">Repeat №{1}</p>{" "}
        <IoIosTrash className="delete--repeat" />
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
