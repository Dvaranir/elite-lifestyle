export const setMenuItems = newState => {
  return dispatch => {
    dispatch({
      type: 'setMenuItems',
      payload: newState,
    });
  };
};
