const reducer = (state = 1, action) => {
  switch (action.type) {
    case "setExercisesStep":
      return (state = action.payload);
    case "resetExercisesStep":
      return (state = 1);
    default:
      return state;
  }
};

export default reducer;
