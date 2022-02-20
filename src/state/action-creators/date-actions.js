export const setDate = newState => {
  return dispatch => {
    dispatch({
      type: 'setDate',
      payload: newState,
    });
  };
};
