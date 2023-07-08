import React, { useEffect } from "react";
import { addDataUser, statusLogin } from "../redux/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Header from "../components/Header";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = localStorage.getItem('token_safari');
    const validateToken = async() => {
      if (token && JSON.parse(token) !== '') {
        try {
        const validation = await axios.post(
          `http://localhost:3333/users/authentication`,
          { token: JSON.parse(token) },
        );
        if(!validation.data.auth) {
          navigate('/');
          dispatch(statusLogin(true));
        } else {
          const decodeToken = await axios.post(
            `http://localhost:3333/users/decode`,
            { token: JSON.parse(token) },
          );
          dispatch(addDataUser({
            user_firstName: decodeToken.data.user_firstName,
            user_lastName: decodeToken.data.user_lastName,
            user_email: decodeToken.data.user_email,
            user_dateOfBirth: decodeToken.data.user_DateOfBirth,
            user_type: decodeToken.data.user_type,
          }));
        }} catch (error) {
          window.alert(error);
      }} else {
        navigate('/');
        dispatch(statusLogin(true));
      }
    };
    validateToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <div className="">
      <Header />
      <div className="h-screen flex items-center justify-center text-6xl">
        Profile
      </div>
    </div>
  );
};