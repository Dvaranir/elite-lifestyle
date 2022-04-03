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

const ExerciseCard = ({ exercise, btnName }) => {
  return (
    <div className="exercise--card" key={exercise.id} id={exercise.id}>
      <div className="image--container">
        <img
          src={
            exercise["images_url_bbc"]
              .replace("{", "")
              .replace("}", "")
              .split(",")[0]
          }
          alt="Exercise"
        />
      </div>
      <div className="exercise--description">
        <p className="exercise--name">{exercise["exercise_name"]}</p>
        <p className="body--part">{exercise["body_part"]}</p>
      </div>
      <button className="btn">{iconSwitcher(btnName)}</button>
    </div>
  );
};

export default ExerciseCard;
