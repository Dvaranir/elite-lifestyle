export const setDate = (newState) => {
  return (dispatch) => {
    dispatch({
      type: "setDate",
      payload: newState,
    });
  };
};
export const toggleAnimation = (newState) => {
  return (dispatch) => {
    dispatch({
      type: "toggleAnimation",
      payload: newState,
    });
  };
};
