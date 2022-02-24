const reducer = (state = [{ show: false, mode: 'signIn' }], action) => {
  switch (action.type) {
    case 'toggleLoginForm':
      return (state = { show: !state.show, mode: action.payload });

    default:
      return state;
  }
};

export default reducer;
