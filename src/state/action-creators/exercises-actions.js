export const setExercises = (newState) => {
  return (dispatch) => {
    dispatch({
      type: "setExercises",
      payload: newState,
    });
  };
};

export const fetchExercises = (url = "http://130.61.70.251:8080/exercises") => {
  return async (dispatch) => {
    let response = await fetch(url);
    response = await response.json();
    dispatch({
      type: "fetchExercises",
      payload: response,
    });
  };
};
