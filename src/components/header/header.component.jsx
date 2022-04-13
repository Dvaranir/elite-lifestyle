import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";

import SignInUp from "../signInUp/signInUp.component";

import { Link } from "react-router-dom";

import "./header.styles.scss";

const Header = (props) => {
  const dispatch = useDispatch();
  const { toggleLoginForm } = bindActionCreators(actionCreators, dispatch);
  const signInUpStatus = useSelector((state) => state.forms.loginForm);

  return (
    <header className="header">
      <SignInUp {...signInUpStatus} />
      <Link to="/">
        <div className="logo">Elite Lifestyle</div>
      </Link>
      <nav className="nav--bar">
        {Object.values(props).map((item) =>
          item.url !== "register" && item.url !== "login" ? (
            <Link key={item.id} to={`/${item.url}`}>
              {item.url[0].toUpperCase() + item.url.slice(1)}
            </Link>
          ) : (
            <p
              key={item.id}
              className={`${item.url + "--nav"} text--selection__none`}
              onClick={(e) =>
                e.target.classList.toString().includes(item.url) &&
                toggleLoginForm(item.url)
              }
            >
              {item.url[0].toUpperCase() + item.url.slice(1)}
            </p>
          )
        )}
      </nav>
    </header>
  );
};

export default Header;
