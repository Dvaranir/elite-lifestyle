import React from "react";
import ExerciseCard from "../exercise_card/exercise_card.component";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const formSelectedDate = (date) => {
  const { year, month, day } = date;
  const selected_date = `${year}/${month + 1}/${day}`;
  return selected_date;
};

const setLocalStorage = (date, userExercises) => {
  const local_storage = window.localStorage;

  local_storage.setItem(date, JSON.stringify(userExercises));
};

const UserExercises = () => {
  const { date, userExercises } = useSelector((state) => state);

  useEffect(() => {
    setLocalStorage(formSelectedDate(date), userExercises);
  }, [userExercises]);

  return (
    <>
      {userExercises[0] ? (
        userExercises.map((exercise) => {
          return (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              btnName="IoIosClose"
            />
          );
        })
      ) : (
        <div className="user--exercises__placeholder">Add some exercises</div>
      )}
    </>
  );
};

export default UserExercises;
