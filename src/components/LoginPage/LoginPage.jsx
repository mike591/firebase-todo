import React from "react";
import "firebase/auth";
import { useAuth } from "hooks/use-auth";
import { Redirect } from "react-router-dom";

const LoginPage = () => {
  const { user, handleLogin } = useAuth();
  if (user) {
    return <Redirect to="/todo" />;
  }
  return (
    <div className="LoginPage">
      <div className="prompt">
        <p>Enter via Google Auth</p>
        <button onClick={handleLogin}>Sign In</button>
      </div>
    </div>
  );
};

export default LoginPage;
