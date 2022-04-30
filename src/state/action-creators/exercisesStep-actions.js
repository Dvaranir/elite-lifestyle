export const setExercisesStep = (newState) => {
  return (dispatch) => {
    dispatch({
      type: "setExercisesStep",
      payload: newState,
    });
  };
};
