import React from "react";
import { useSelector } from "react-redux";

import { IoIosAdd, IoIosClose } from "react-icons/io";

import "./exercise_card.component.scss";

const iconSwitcher = (iconName) => {
  switch (iconName) {
    case "IoIosClose":
      return <IoIosClose className="btn__component" id="btn__remove" />;
    case "IoIosAdd":
      return <IoIosAdd className="btn__component" />;

    default:
      <></>;
  }
};

const generateUserExerciseCard = (
  userExerciseCard,
  currentDate,
  exercise,
  userExercises,
  { repeatId, show }
) => {
  if (!userExerciseCard) return;

  const index_of_exercise = userExercises?.[currentDate].indexOf(exercise);
  const current_exercise = userExercises?.[currentDate]?.[index_of_exercise];
  const repeats_in_exercise = current_exercise?.repeats;

  const isRepeatActive = (id, activeRepeatId, formShowing) => {
    if (activeRepeatId === id && formShowing) return " active--repeat";
    else return "";
  };

  return (
    <div className="repeats--container">
      <div className="repeat--units">
        <i className="weight--units">kg</i>
        <i className="repeat--units">rp</i>
      </div>
      {Array.isArray(repeats_in_exercise) &&
        repeats_in_exercise.map(({ id, weight, repeats }) => {
          const repeatActive = isRepeatActive(id, repeatId, show);
          return (
            <div className={`repeat${repeatActive}`} key={id} id={id}>
              <p className="exercise--weight">
                <b>{weight}</b>
              </p>
              <p className="exercise--repeats">
                <b>{repeats}</b>
              </p>
            </div>
          );
        })}

      <IoIosAdd className="add--repeat__btn" id="add--repeat__btn" />
    </div>
  );
};

const ExerciseCard = ({
  exercise,
  btnName,
  userExerciseCard = false,
  observe,
}) => {
  const { userExercises, date, forms } = useSelector((state) => state);
  const { full_date } = date;
  const { id, images_url_bbc, exercise_name, body_part } = exercise;
  const { repeatsForm } = forms;

  return (
    <article className="exercise--card" key={id} id={id} ref={observe}>
      <div className="image--container">
        <img
          src={images_url_bbc.replace("{", "").replace("}", "").split(",")[0]}
          alt="Exercise"
        />
      </div>
      <div className="exercise--description">
        <p className="exercise--name">
          <strong>{exercise_name}</strong>
        </p>
        <p className="body--part">{body_part}</p>
        {generateUserExerciseCard(
          userExerciseCard,
          full_date,
          exercise,
          userExercises,
          repeatsForm
        )}
      </div>
      <button className="btn">{iconSwitcher(btnName)}</button>
    </article>
  );
};

export default ExerciseCard;
