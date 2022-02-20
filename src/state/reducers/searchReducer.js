const reducer = (state = '', action) => {
  switch (action.type) {
    case 'setSearch':
      return (state = action.payload);

    default:
      return state;
  }
};

export default reducer;
