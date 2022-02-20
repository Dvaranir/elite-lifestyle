import React from 'react';
import { useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const getDateObject = date => {
  const date_obj = {
    day: date.getDate(),
    month: date.getMonth(),
    month_name: date.toLocaleString('en-US', { month: 'long' }),
    year: date.getFullYear(),
    days_in_month: getDaysInMonth(date.getFullYear(), date.getMonth() + 1),
  };

  return date_obj;
};

const changeDate = (day, month, year) => {
  return getDateObject(new Date(year, month, day));
};

const prevMonth = (day, month, year) => {
  return changeDate(day, Number(month) - 1, year);
};

const nextMonth = (day, month, year) => {
  return changeDate(day, Number(month) + 1, year);
};

const genDaysInMonth = numberOfDays => {
  let i = 0;

  let days_buffer = [];
  while (i < numberOfDays) {
    i++;

    days_buffer.push(
      <div key={i + 'day'} className={`day text--selection__none ${i}`}>
        {i.toString().padStart(2, '0')}
      </div>
    );
  }
  return <>{days_buffer}</>;
};

const date_object = getDateObject(new Date());

const Calendar = ({ date, setDate }) => {
  useEffect(() => {
    setDate(date_object);
  }, []);

  let { day, month, year } = date;

  return (
    <section className="calendar--section">
      <div className="month--year">
        <button
          onClick={() => {
            setDate({
              ...prevMonth(day, month, year),
            });
          }}
          className="month--btn prev--month__btn"
        >
          <IoIosArrowBack className="month--btn__component" />
        </button>
        <div className="date--container">
          <div className="month">{date.month_name}</div>
          <div className="year">{date.year}</div>
        </div>
        <button
          onClick={() => {
            setDate({
              ...nextMonth(date['day'], date['month'], date['year']),
            });
          }}
          className="month--btn next--month__btn"
        >
          <IoIosArrowForward className="month--btn__component" />
        </button>
      </div>
      <div className="days--container">
        {genDaysInMonth(date.days_in_month)}
      </div>
    </section>
  );
};

export default Calendar;
