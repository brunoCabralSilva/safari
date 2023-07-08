import React from "react";
import Login from "./Login";
import axios from "axios";
import { useSlice, logoutUser } from "../redux/slice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { statusLogin } from '../redux/slice';
import { useNavigate } from "react-router-dom";
import Register from './Register';
import Forget from './Forget';
import PopUpLogout from './PopUpLogout';
import {
    AiOutlineHeart,
    AiOutlineSearch,
    AiOutlineShoppingCart,
    AiOutlineUser
} from 'react-icons/ai';
import { AiFillCaretDown } from 'react-icons/ai';

export default function Header() {
  const slice = useSelector(useSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateToken = async (endpoint: string) => {
    const token: string | null = localStorage.getItem('token_safari');
    if (token && token !== '') {
      const validation: { auth: boolean } = await axios.post(
        `http://localhost:3333/users/authentication`,
        { token: JSON.parse(token) }
      );

      if (validation) {
        navigate(endpoint);
      } else {
        dispatch(statusLogin(true));  
      }
    } else {
      dispatch(statusLogin(true));
    }
  };

  const logged = () => {
    return(
      <div className="leading-5 flex flex-col items-end">
        <p className="leading-5 font-bold">
          { `Olá, ${slice.user_firstName}` }
        </p>
        <div className="leading-5 text-sm">
          <span
            className="hover:underline underline-offset-2"
            onClick={ () => {
              dispatch(statusLogin(false));
              navigate('/meus-pedidos')
            }}
            >
              Meus pedidos
            </span>
          <span className="px-2">|</span>
          <span
            className="hover:underline underline-offset-2"
            onClick={ () => dispatch(logoutUser(true)) }
          >
            Sair
          </span>
        </div>
      </div>
    );
  };

  const unLogged = () => {
    return(
      <div className="leading-5 flex flex-col items-end"
        onClick={ () => dispatch(statusLogin(true)) }
      >
        <p>Olá, faça Login ou</p>
        <p className="flex items-center">
          <span>Cadastre-se</span>
          <AiFillCaretDown />
        </p>
      </div>
    )
  };

  return(
    <header className="relative">
      { slice.user_login && (!slice.user_email || slice.user_email === '') &&<Login /> }
      { slice.user_register && (!slice.user_email || slice.user_email === '') && <Register /> }
      { slice.user_reminder && (!slice.user_email || slice.user_email === '') && <Forget /> }
      { slice.user_logout && <PopUpLogout /> }
      <div className="flex items-center justify-center w-full py-3">
        <span className="text-sm">Pague também com</span>
        <img
          src={ require('../images/pix.png') }
          alt="Pix"
          className="w-20 pl-2"
        />
      </div>
      <div className="bg-green-500 w-full flex items-center justify-between px-10 py-5">
        <div
          className="flex items-center justify-center gap-3 cursor-pointer"
          onClick={ () => navigate('/') }
        >
          <img
            src={require('../images/elephant.png')}
            className="w-10"
            alt=""
          />
          <span
            className="font-bold text-4xl"
          >
            Safari
          </span>
        </div>
        <div className="h-full flex items-center justify-center">
          <input
            className="h-8"
            type="text"
          />
          <button
            className="bg-white h-8 px-3 mb-0 border-l"
            type="button"
          >
            <AiOutlineSearch />
          </button>
        </div>
        <div className="flex justify-center items-center text-3xl gap-5">
          <AiOutlineHeart
            className="cursor-pointer"
            onClick={ () => validateToken('/favoritos') }
          />
          <AiOutlineUser
            className="cursor-pointer"
            onClick={ () => validateToken('/perfil') }
          />
          <AiOutlineShoppingCart
            className="cursor-pointer"
            onClick={ () => validateToken('/carrinho-de-compras') }
          />
          <div
            className="ml-10 cursor-pointer"
          >
            <span className="text-base">
              { slice.user_firstName ? logged() : unLogged() }
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}