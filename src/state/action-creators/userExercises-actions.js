export const setUserExercises = newState => {
  return dispatch => {
    dispatch({
      type: 'setUserExercises',
      payload: newState,
    });
  };
};
