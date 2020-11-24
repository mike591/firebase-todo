import React from "react";
import { useAuth } from "hooks/useAuth";
import Loader from "react-loader-spinner";

const BaseLoader = () => {
  const { isLoadingAuth } = useAuth();

  const isLoading = isLoadingAuth;
  return (
    <div className="BaseLoader">
      {isLoading && (
        <div className="dimmer">
          <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
        </div>
      )}
    </div>
  );
};

export default BaseLoader;
