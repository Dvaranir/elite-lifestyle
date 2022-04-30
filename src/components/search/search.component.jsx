import React from "react";
import "./search.component.scss";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";

const SearchBar = ({ placeholder }) => {
  const dispatch = useDispatch();
  const { setSearch, setExercisesStep } = bindActionCreators(
    actionCreators,
    dispatch
  );
  return (
    <div className="search--box">
      <input
        type="search"
        placeholder={placeholder}
        onChange={(event) => {
          setSearch(event.target.value);
          setExercisesStep(1);
        }}
      />
    </div>
  );
};

export default SearchBar;
