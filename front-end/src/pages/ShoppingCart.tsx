import React, { useEffect } from "react";
import { statusLogin } from "../redux/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Header from "../components/Header";

export default function ShoppinCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = localStorage.getItem('token_safari');

    const validateToken = async() => {
      if (token && JSON.parse(token) !== '') {
        const validation = await axios.post(
          `http://localhost:3333/users/authentication`,
          { token: JSON.parse(token) },
        );
        if(!validation.data.auth) {
          navigate('/');
          dispatch(statusLogin(true));
        }
      } else {
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
      Carrinho de Compras
    </div>
  );
};