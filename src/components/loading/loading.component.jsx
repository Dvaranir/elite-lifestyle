import React from "react";
import { IoIosSync } from "react-icons/io";

import "./loading.component.scss";
// Just a simple rotating image component
const Loading = () => {
  return (
    <div className="loading--container rotate">
      <IoIosSync />
    </div>
  );
};

export default Loading;
