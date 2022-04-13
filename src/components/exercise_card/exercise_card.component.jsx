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
  userExercises
) => {
  if (!userExerciseCard) return;

  const index_of_exercise = userExercises?.[currentDate].indexOf(exercise);
  const repeats_in_exercise =
    userExercises?.[currentDate]?.[index_of_exercise]?.repeats;
  return (
    <div className="repeats--container">
      {Array.isArray(repeats_in_exercise) &&
        repeats_in_exercise.map(({ id, weight, repeats }) => {
          return (
            <div className="repeat" key={id} id={id}>
              <p className="exercise--weight">
                <b>{weight}</b> <i>kg</i>
              </p>
              <p className="exercise--repeats">
                <b>{repeats}</b> <i>rp</i>
              </p>
            </div>
          );
        })}

      <IoIosAdd className="add--repeat__btn" id="add--repeat__btn" />
    </div>
  );
};

const ExerciseCard = ({ exercise, btnName, userExerciseCard = false }) => {
  const { userExercises, date } = useSelector((state) => state);
  const { full_date } = date;
  const { id, images_url_bbc, exercise_name, body_part } = exercise;

  return (
    <article className="exercise--card" key={id} id={id}>
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
          userExercises
        )}
      </div>
      <button className="btn">{iconSwitcher(btnName)}</button>
    </article>
  );
};

export default ExerciseCard;
