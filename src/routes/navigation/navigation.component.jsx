import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import logo1 from "../../assets/logo1.png";
import { UserContext } from "../../context/user.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

export const Navigation = () => {
  const { setCurrentUser, currentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();

    setCurrentUser(null);
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={logo1} alt="" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};
