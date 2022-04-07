const reducer = (state = {}, action) => {
  switch (action.type) {
    case "setDate":
      return (state = action.payload);
    case "toggleAnimation":
      return { ...state, toggle: !state.toggle };
    default:
      return state;
  }
};

export default reducer;
