import { combineReducers } from "redux";
import dateReducer from "./dateReducer";
import exercisesReducer from "./exercisesReducer";
import menuItemsReducer from "./menuItemsReducer";
import searchReducer from "./searchReducer";
import userExercisesReducer from "./userExercisesReducer";
import formsReducer from "./formsReducer";
import exercisesStepReducer from "./exercisesStepReducer";

const redusers = combineReducers({
  date: dateReducer,
  exercises: exercisesReducer,
  menu: menuItemsReducer,
  search: searchReducer,
  userExercises: userExercisesReducer,
  forms: formsReducer,
  exercisesStep: exercisesStepReducer,
});

export default redusers;
