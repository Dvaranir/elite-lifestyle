import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import { useEffect } from "react";

const genDaysInMonth = (numberOfDays, year, month, currentDay) => {
  let i = 0;

  let days_buffer = [];
  while (i < numberOfDays) {
    i++;
    const id = `${year}/${month + 1}/${i}`;

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
  const { setDate } = bindActionCreators(actionCreators, dispatch);

  const { date } = useSelector((state) => state);
  const { days_in_month, year, month, day } = date;

  useEffect(() => {
    console.log(date);
  });

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
