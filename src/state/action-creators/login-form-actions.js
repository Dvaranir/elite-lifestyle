export const toggleLoginForm = newState => {
  return dispatch => {
    dispatch({
      type: 'toggleLoginForm',
      payload: newState,
    });
  };
};
