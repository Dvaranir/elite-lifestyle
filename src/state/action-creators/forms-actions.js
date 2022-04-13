export const toggleLoginForm = (newState) => {
  return (dispatch) => {
    dispatch({
      type: "toggleLoginForm",
      payload: newState,
    });
  };
};
export const toggleRepeatsForm = (newState) => {
  return (dispatch) => {
    dispatch({
      type: "toggleRepeatsForm",
      payload: newState,
    });
  };
};
export const hideRepeatsForm = (newState) => {
  return (dispatch) => {
    dispatch({
      type: "hideRepeatsForm",
      payload: newState,
    });
  };
};
