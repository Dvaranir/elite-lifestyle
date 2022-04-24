import React from "react";
import "./search.component.scss";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";

const SearchBar = ({ placeholder }) => {
  const dispatch = useDispatch();
  const { setSearch } = bindActionCreators(actionCreators, dispatch);
  return (
    <div className="search--box">
      <input
        type="search"
        placeholder={placeholder}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
};

export default SearchBar;
