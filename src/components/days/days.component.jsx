import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import "./days.component.scss";

const addDayIndicator = (full_date, user_exercises) => {
  if (user_exercises[full_date] && user_exercises[full_date] !== "") {
    const number_of_exercises = user_exercises[full_date].length;

    if (number_of_exercises === 1) return "border--indicator not--empty__day";
    if (number_of_exercises > 1 && number_of_exercises <= 3)
      return "border--indicator semi--full__day";
    if (number_of_exercises >= 4) return "border--indicator full--day";
    else return "";
  }
};

const genDays = (numberOfDays, full_date, user_exercises) => {
  let i = 0;

  let days_buffer = {};
  while (i < numberOfDays) {
    i++;
    let year_month = full_date.substring(0, 8);
    const id = year_month + i.toString().padStart(2, "0");

    days_buffer[id] = addDayIndicator(full_date, user_exercises);
  }

  console.log(days_buffer);
  return days_buffer;
};

const genDaysInMonth = (days, currentDay) => {
  const days_buffer = [];
  Object.keys(days).forEach((key) => {
    let day = key.slice(8, 10);

    days_buffer.push(
      <div
        key={key}
        id={key}
        className={`day text--selection__none ${
          currentDay === Number(day) && "current--day "
        }${days[key]}`}
      >
        {day}
      </div>
    );
  });
  console.log(days_buffer);

  return <>{days_buffer}</>;
};

const Days = ({ getDateObject }) => {
  const dispatch = useDispatch();
  const { setDate } = bindActionCreators(actionCreators, dispatch);

  const { date, userExercises } = useSelector((state) => state);
  const { days_in_month, full_date, day } = date;

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
      {genDaysInMonth(genDays(days_in_month, full_date, userExercises), day)}
    </div>
  );
};

export default Days;
