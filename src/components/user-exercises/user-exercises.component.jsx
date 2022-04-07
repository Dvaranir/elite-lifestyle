import React from "react";
import ExerciseCard from "../exercise_card/exercise_card.component";
import { useSelector } from "react-redux";

const UserExercises = () => {
  const { userExercises, date } = useSelector((state) => state);
  const { full_date } = date;

  return (
    <>
      {userExercises[full_date] ? (
        userExercises[full_date].map((exercise) => {
          return (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              userExerciseCard={true}
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
