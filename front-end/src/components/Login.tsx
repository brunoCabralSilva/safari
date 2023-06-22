import React from "react";
import { IoIosArrowForward } from 'react-icons/io';

export default function Login() {
  return(
    <div
      className="fixed right-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full flex-col bg-white z-50 flex items-center justify-center px-7"
    >
        <IoIosArrowForward className="fixed right-0 top-0 m-5 text-3xl" />
        <img
          src={require('../images/elephant.png')}
          className="w-14 mb-3"
          alt=""
        />
        <input
          type="email"
          className="w-full py-1 text-center border-black border-2"
          placeholder="Email"
        />
        <input
          type="password"
          className="mt-3 py-1 text-center w-full border-black border-2"
          placeholder="Senha"
        />
        <button
          type="button"
          className="w-full bg-black py-1 mt-3 text-white"
        >
          Login
        </button>
        <p className="underline mt-20">Esqueci minha Senha</p>
        <p className="underline mt-3">Não possuo Cadastro</p>
    </div>
  )
}