export const setSearch = newState => {
  return dispatch => {
    dispatch({
      type: 'setSearch',
      payload: newState,
    });
  };
};
