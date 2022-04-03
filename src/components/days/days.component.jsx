import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import { useEffect } from "react";

const addPartiallyFilledClass = (id) => {
  const local_storage = window.localStorage;

  if (local_storage.getItem(id)) {
    // console.log(local_storage.getItem(id).length);
  }
};

const genDaysInMonth = (numberOfDays, year, month, currentDay) => {
  let i = 0;

  let days_buffer = [];
  while (i < numberOfDays) {
    i++;
    const id = `${year}/${month + 1}/${i}`;

    addPartiallyFilledClass(id);

    days_buffer.push(
      <div
        key={id}
        id={id}
        className={`day text--selection__none ${
          currentDay === i && "current--day"
        }`}
      >
        {i.toString().padStart(2, "0")}
      </div>
    );
  }
  return <>{days_buffer}</>;
};

const Days = ({ getDateObject }) => {
  const dispatch = useDispatch();
  const { setDate, setUserExercises } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const { date, exercises } = useSelector((state) => state);
  const { days_in_month, year, month, day } = date;

  useEffect(() => {
    const local_storage = window.localStorage;

    const selected_date = `${year}/${month + 1}/${day}`;

    if (local_storage.getItem(selected_date)) {
      const u_exercises = JSON.parse(local_storage.getItem(selected_date));
      let retrieve_exercises = [];
      u_exercises.forEach((el) => {
        retrieve_exercises.push(
          ...exercises.filter((exercise) => exercise.id === el.id)
        );
      });

      setUserExercises(retrieve_exercises);
    } else {
      setUserExercises("");
    }
  }, [day]);

  return (
    <div
      className="days--container"
      onClick={(e) => {
        try {
          const [year, month, day] = e.target.id.split("/");
          const propDate = new Date(year, month - 1, day);
          const date_object = getDateObject(propDate);
          date_object.day && setDate(date_object);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {genDaysInMonth(days_in_month, year, month, day)}
    </div>
  );
};

export default Days;
