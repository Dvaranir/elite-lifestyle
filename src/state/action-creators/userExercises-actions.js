export const setUserExercises = ({ date, exercises }) => {
  return (dispatch) => {
    dispatch({
      type: "setUserExercises",
      payload: { date: date, exercises: exercises },
    });
  };
};
