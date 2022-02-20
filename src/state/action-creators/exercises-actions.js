export const setExercises = newState => {
  return dispatch => {
    dispatch({
      type: 'setExercises',
      payload: newState,
    });
  };
};

export const fetchExercises = (url = 'http://127.0.0.1:5000/exercises') => {
  return async dispatch => {
    let response = await fetch(url);
    response = await response.json();
    dispatch({
      type: 'fetchExercises',
      payload: response,
    });
  };
};
