export const setDate = newState => {
  return dispatch => {
    dispatch({
      type: 'setDate',
      payload: newState,
    });
  };
};

export const getDate = () => {
  return dispatch => {
    dispatch({
      type: 'getDate',
    });
  };
};

export const setExercises = newState => {
  return dispatch => {
    dispatch({
      type: 'setExercises',
      payload: newState,
    });
  };
};

export const getExercises = () => {
  return dispatch => {
    dispatch({
      type: 'getExercises',
    });
  };
};

export const setMenuItems = newState => {
  return dispatch => {
    dispatch({
      type: 'setMenuItems',
      payload: newState,
    });
  };
};

export const getMenuItems = () => {
  return dispatch => {
    dispatch({
      type: 'getMenuItems',
    });
  };
};

export const setSearch = newState => {
  return dispatch => {
    dispatch({
      type: 'setSearch',
      payload: newState,
    });
  };
};

export const getSearch = () => {
  return dispatch => {
    dispatch({
      type: 'getSearch',
    });
  };
};

export const setUserExercises = newState => {
  return dispatch => {
    dispatch({
      type: 'setUserExercises',
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
