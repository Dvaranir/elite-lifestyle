const reducer = (state = {}, action) => {
  switch (action.type) {
    case "setUserExercises":
      const { date, exercises } = action.payload;

      return (state = { ...state, [date]: exercises });

    default:
      return state;
  }
};

export default reducer;
