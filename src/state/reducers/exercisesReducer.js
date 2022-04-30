const reducer = (state = [], action) => {
  switch (action.type) {
    case "setExercises":
      return (state = [...state, ...action.payload]);
    case "fetchExercises":
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
