import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { statusChange, statusReset } from "../redux/slice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { validateEmail } from "./registerValidation";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ message: '', error: false });

  const resetPassword = async () => {
    if (validateEmail(email)) {
      setMessage(
        {
          message: 'Necessário fornecer um Email válido',
          error: true,
        });
    } else {
      setMessage({
        message: 'Processando sua solicitação, por favor aguarde...',
        error: false
      });
      try {
        const send = await axios.post(
          'http://localhost:3333/users/reset-password',
          {
            user_email: email,
          }
          );
        setEmail('');

        const positiveMessage = 'Uma mensagem de verificação foi enviada para o seu e-mail. Utilize as diretrizes enviadas para recuperar sua senha';
        setMessage(
          {
            message: send.data.message,
            error: send.data.message === positiveMessage,
          }
        );

        setTimeout(() => {
          setMessage({ message: '', error: false });
          dispatch(statusReset(false));
          dispatch(statusChange(true));
        }, 4000);
        

      } catch(error: any) {
        setMessage(error);
      }
    }
    setTimeout(() => {
      setMessage({ message: '', error: false });
    }, 4000);
  };

  return(
    <div
      className="fixed right-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full flex-col bg-white z-50 flex items-center justify-center px-7"
    >
      <IoIosArrowForward
        className="fixed right-0 top-0 m-5 text-3xl cursor-pointer"
        onClick={ () => dispatch(statusReset(false)) }
      />
        <img
          src={require('../images/elephant.png')}
          className="w-14 mb-3"
          alt=""
        />
        <p className="text-center py-5 font-bold">
          Informe seu Email de cadastro. Para ele, iremos enviar um código de verificação para que você altere sua Senha Antiga
        </p>
        <input
          type="email"
          className="w-full py-1 text-center border-black border-2"
          placeholder="Email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <button
          type="button"
          onClick={ resetPassword }
          className="w-full bg-black py-1 mt-3 text-white"
        >
          Enviar Código
        </button>
        <div className={ `mt-10 h-20 font-bold ${message.error ? 'text-red-900': 'text-green-900'} text-center `}>
          { message.message }
        </div>
        <p
          className="underline cursor-pointer"
          onClick={ () => {
              dispatch(statusReset(false));
              dispatch(statusChange(true));
            }
          }
        >
          Já possuo um código
        </p>
    </div>
  );
};