export function getRepeatIndex(targetExercise, targetRepeatId) {
  const old_repeats = targetExercise?.repeats;
  const existing_repeat = old_repeats?.filter(
    (repeat) => repeat?.id === targetRepeatId
  );
  const index = old_repeats?.indexOf(existing_repeat[0]);

  return index ? index : "";
}

export function checkForDublicates(id, exercises, userExercises) {
  if (!userExercises) return;
  const clicked_exercise = exercises.filter((ex) => ex.id.includes(id));
  const check_for_dublicates = userExercises.filter((ex) => ex.id.includes(id));

  return (
    JSON.stringify(check_for_dublicates[0]?.id) ===
    JSON.stringify(clicked_exercise[0]?.id)
  );
}

export function checkOnclickElement(e, elementName, parentElNameList) {
  const targetElName = e.target.classList.value;
  const parent_element = e.target?.parentElement?.classList?.value;
  const isTestPassed = parentElNameList.some(
    (element) => parent_element === element
  );
  if (elementName === targetElName || isTestPassed) return true;
}

export function addRemoveExercise(e, exercises, userExercises, full_date) {
  // Select target exercise card id
  const id_exercise_to_add = e.target.closest(".exercise--card").id;
  // Select clicked exercise
  const clicked_exercise = exercises.filter((ex) =>
    ex.id.includes(id_exercise_to_add)
  );

  // Check for exercise dublicate
  if (checkForDublicates(id_exercise_to_add, exercises, userExercises)) {
    return {
      date: full_date,
      exercises: [
        ...userExercises.filter(
          (exercise) => exercise.id !== clicked_exercise[0].id
        ),
      ],
    };
  } else if (Array.isArray(userExercises)) {
    return {
      date: full_date,
      exercises: [...new Set([...userExercises, ...clicked_exercise])],
    };
  } else {
    return {
      date: full_date,
      exercises: [...clicked_exercise],
    };
  }
}
