const reducer = (
  state = {
    loginForm: { show: false, mode: "signIn" },
    repeatsForm: { show: false, repeatId: 1, currentExerciseID: "" },
  },
  action
) => {
  switch (action.type) {
    case "toggleLoginForm":
      return (state = {
        loginForm: { show: !state.loginForm.show, mode: action.payload },
        repeatsForm: { show: false },
      });

    case "toggleRepeatsForm":
      return (state = {
        loginForm: { show: false, mode: "signIn" },
        repeatsForm: {
          show: !state.repeatsForm.show,
          repeatId: action.payload?.repeatId,
          currentExerciseID: action.payload?.id,
        },
      });

    case "hideRepeatsForm":
      return (state = {
        loginForm: { show: false, mode: "signIn" },
        repeatsForm: {
          show: false,
          repeatId: action.payload?.repeatId,
          currentExerciseID: action.payload?.id,
        },
      });

    default:
      return state;
  }
};

export default reducer;
