import React from 'react';

const Day = ({ year, month, day, numberOfDays }) => {
  let i = 0;
  const id = [year, month, day];

  let days_buffer = [];
  while (i < numberOfDays) {
    i++;

    days_buffer.push(
      <div key={id} className={`day text--selection__none ${i}`}>
        {i.toString().padStart(2, '0')}
      </div>
    );
  }
  return <>{days_buffer}</>;
};

export default Day;
