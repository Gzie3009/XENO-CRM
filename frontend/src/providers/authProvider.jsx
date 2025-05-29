import useStore from "@/store/useStore";
import api from "@/utils/API";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useStore();
  const getUserData = async () => {
    try {
      const response = await api.get("/auth/me");
      if (response.status === 200) {
        setUser(response.data.data);
      } else if (response.status === 401) {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return <>{children}</>;
};

export default AuthProvider;
