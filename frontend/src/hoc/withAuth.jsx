import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
