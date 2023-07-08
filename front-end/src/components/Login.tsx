import React, { useState } from "react";
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch, useSelector } from "react-redux";
import { addDataUser, statusLogin, useSlice } from "../redux/slice";
import axios from "axios";

export default function Login() {
  const dispatch = useDispatch();
  const slice = useSelector(useSlice);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const login = async() => {
    try {
      const loginUser = await axios.post(
        `http://localhost:3333/users/login`,
        {
          user_email: email,
          user_password: password,
        },
      );

      if (loginUser.data.message) {
        setMessage(loginUser.data.message);
      } else {
        setMessage('');
        dispatch(statusLogin(!slice.user_login));
        dispatch(addDataUser({
          user_id: loginUser.data.user_id,
          user_firstName: loginUser.data.user_firstName,
          user_lastName: loginUser.data.user_lastName,
          user_cpf: loginUser.data.user_cpf,
          user_email: loginUser.data.user_email,
          user_dateOfBirth: loginUser.data.user_DateOfBirth,
        }));
        localStorage.setItem(
          'token_safari',
          JSON.stringify(loginUser.data.token)
        );
      }
    }
    catch(error: any) {
      setMessage(error.response.data.message);
    }
  };

  return(
    <div
      className="fixed right-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full flex-col bg-white z-50 flex items-center justify-center px-7"
    >
        <IoIosArrowForward
          className="fixed right-0 top-0 m-5 text-3xl cursor-pointer"
          onClick={ () => dispatch(statusLogin(!slice.user_login)) }
        />
        <img
          src={require('../images/elephant.png')}
          className="w-14 mb-3"
          alt=""
        />
        <input
          type="email"
          className="w-full py-1 text-center border-black border-2"
          placeholder="Email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          type="password"
          className="mt-3 py-1 text-center w-full border-black border-2"
          placeholder="Senha"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button
          type="button"
          onClick={ login }
          className="w-full bg-black py-1 mt-3 text-white"
        >
          Login
        </button>
        <div className="mt-10 font-bold text-red-900"> { message } </div>
        <p className="underline mt-10 cursor-pointer">Esqueci minha Senha</p>
        <p className="underline mt-3 cursor-pointer">Não possuo Cadastro</p>
    </div>
  );
}