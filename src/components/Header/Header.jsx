import React from "react";
import { useAuth } from "hooks/useAuth";
import { useHistory } from "react-router-dom";

const Header = () => {
  const { user } = useAuth();
  const history = useHistory();

  return (
    <div className="Header">
      <div className="app-name">TODO App</div>
      {user && <button onClick={() => history.push("/logout")}>Logout</button>}
    </div>
  );
};

export default Header;
