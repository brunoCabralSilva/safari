import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDataUser, logoutUser } from "../redux/slice";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(addDataUser({
      user_firstName: '',
      user_lastName: '',
      user_email: '',
      user_dateOfBirth: '',
      user_login: false,
      user_register: false,
      user_reminder: false,
    }));
    localStorage.removeItem('token_safari');
    navigate('/');
  };
  
  return(
    <div
      className="fixed right-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full flex-col bg-white z-50 flex items-center justify-center px-7"
    >
      <img
        src={require('../images/elephant.png')}
        className="w-20"
        alt=""
      />
      <p className="py-10 font-bold text-center">Você está saindo da sua conta de Usuário. Está certo disso?</p>
      <div className="flex items-center justify-center gap-2 w-full">
        <button
          type="button"
          onClick={ logout }
          className="p-3 bg-red-500 font-bold w-1/3"
        >
          Sim
        </button>
        <button
          type="button"
          onClick={ () => dispatch(logoutUser(false)) }
          className="p-3 bg-green-500 font-bold w-1/3"
        >
          Não
        </button>
      </div>
    </div>
  );
};