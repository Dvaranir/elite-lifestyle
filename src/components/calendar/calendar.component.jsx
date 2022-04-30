import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import { useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Days from "../days/days.component";
import "./calendar.component.scss";

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};
// Adding zero to start of the day number
const addPadstart = (value) => {
  return value.toString().padStart(2, "0");
};

// Generates date object for date state
function genDateObject(date) {
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let month_name = date.toLocaleString("en-US", { month: "long" });

  const date_obj = {
    day: day,
    month: month,
    year: year,
    full_date: `${year}/${addPadstart(month + 1)}/${addPadstart(day)}`,
    month_name: month_name,
    days_in_month: getDaysInMonth(year, month + 1),
    userExercises: [],
  };

  return date_obj;
}

const changeDate = (year, month, day) => {
  return genDateObject(new Date(year, month, day));
};

const prevMonth = (year, month, day) => {
  return changeDate(year, Number(month) - 1, day);
};

const nextMonth = (year, month, day) => {
  return changeDate(year, Number(month) + 1, day);
};

const Calendar = () => {
  const dispatch = useDispatch();
  const { setDate } = bindActionCreators(actionCreators, dispatch);

  const { date } = useSelector((state) => state);
  let { day, month, year, month_name } = date;

  useEffect(() => {
    const date_object = genDateObject(new Date());

    setDate(date_object);
  }, []);

  return (
    <section className="calendar--section">
      <div className="days--controls">
        <div className="month--year">
          <button
            onClick={() => {
              setDate({
                ...prevMonth(year, month, day),
              });
            }}
            className="month--btn prev--month__btn"
          >
            <IoIosArrowBack className="month--btn__component" />
          </button>
          <div className="date--container">
            <div className="month">{month_name}</div>
            <div className="year">{year}</div>
          </div>
          <button
            onClick={() => {
              setDate({
                ...nextMonth(year, month, day),
              });
            }}
            className="month--btn next--month__btn"
          >
            <IoIosArrowForward className="month--btn__component" />
          </button>
        </div>
        <Days genDateObject={genDateObject} />
      </div>
    </section>
  );
};

export default Calendar;
