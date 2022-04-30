import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import "./days.component.scss";

// Adds indicator if day have some user exercises
// indicator depends on number or exercises
const addDayIndicator = (fullDate, userExercises) => {
  if (userExercises[fullDate] && userExercises[fullDate] !== "") {
    const exs_count = userExercises[fullDate].length;
    const tag = " border--indicator ";

    if (exs_count === 1) return `${tag} not--empty__day`;
    if (exs_count > 1 && exs_count <= 3) return `${tag} semi--full__day`;
    if (exs_count >= 4) return `${tag} full--day`;
    else return "";
  } else return "";
};

const genDays = (numberOfDays, fullDate, userExercises) => {
  let i = 0;

  let days_buffer = {};
  while (i < numberOfDays) {
    i++;
    let year_month = fullDate.substring(0, 8);
    const id = year_month + i.toString().padStart(2, "0");

    days_buffer[id] = addDayIndicator(id, userExercises);
  }

  return days_buffer;
};

const genMonth = (days, currentDay) => {
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

  return <>{days_buffer}</>;
};

const Days = ({ genDateObject }) => {
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
          const date_object = genDateObject(propDate);
          date_object.day && setDate(date_object);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {genMonth(genDays(days_in_month, full_date, userExercises), day)}
    </div>
  );
};

export default Days;
