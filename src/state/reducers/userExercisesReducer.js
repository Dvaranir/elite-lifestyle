const reducer = (state = [], action) => {
  switch (action.type) {
    case 'setUserExercises':
      return (state = [...action.payload]);

    default:
      return state;
  }
};

export default reducer;
