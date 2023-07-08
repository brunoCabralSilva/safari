import React, { useEffect } from "react";
import Header from "../components/Header";
import Categories from "../components/Categories";
import { addDataUser } from "../redux/slice";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token_safari');
    const validateToken = async() => {
      if (token && JSON.parse(token) !== '') {
        try {
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
        } catch(error) {
          window.alert(error);
        }
      }
    };
    validateToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <div className="">
      <Header />
      <div className="flex items-center justify-center w-full py-3 bg-black text-white">
        ENTREGA EXPRESSA - RECEBA NO MESMO DIA* | para pedidos aprovados até às 12h, válido para cidades da Grande São Paulo (seg. a sáb.).
      </div>
      <div>
      <img
        src={require('../images/loja-virtual.png')}
        className="w-full h-40vh object-cover object-top"
        alt=""
      />
      </div>
      <Categories />
    </div>
  );
}