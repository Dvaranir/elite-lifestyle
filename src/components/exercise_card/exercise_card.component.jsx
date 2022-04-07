import React from "react";
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

const generateUserExerciseCard = (userExerciseCard) => {
  if (!userExerciseCard) return;

  return (
    <div className="approaches--container">
      <div className="labels--container">
        <p className="approach--weight__label">Weight</p>
        <p className="approach--repeat__label">Repeats</p>
      </div>
      <div className="buttons--container">
        <button className="add--btn">Add</button>
        <button className="remove--btn">Remove</button>
      </div>
      <div className="weight--repeats">
        <p className="exercise--repeats">12</p>
        <p className="exercise--weight">15 kg</p>
      </div>
    </div>
  );
};

const ExerciseCard = ({ exercise, btnName, userExerciseCard = false }) => {
  const { id, images_url_bbc, exercise_name, body_part } = exercise;
  return (
    <div className="exercise--card" key={id} id={id}>
      <div className="image--container">
        <img
          src={images_url_bbc.replace("{", "").replace("}", "").split(",")[0]}
          alt="Exercise"
        />
      </div>
      <div className="exercise--description">
        <p className="exercise--name">{exercise_name}</p>
        <p className="body--part">{body_part}</p>
        {generateUserExerciseCard(userExerciseCard)}
      </div>
      <button className="btn">{iconSwitcher(btnName)}</button>
    </div>
  );
};

export default ExerciseCard;
