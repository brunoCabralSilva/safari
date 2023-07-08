import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { addDataUser, statusChange, statusLogin } from "../redux/slice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { equalityPassword, validateCode, validateEmail, validatePassword } from "./registerValidation";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordR, setPasswordR] = useState('');
  const [message, setMessage] = useState({ message: '', error: false });

  const changePassword = async () => {

    if (validateEmail(email)) {
      setMessage({
        message: 'Necessário fornecer um Email válido',
        error: true,
      });
    } else if (validateCode(emailCode)) {
      setMessage({
        message: 'O Código enviado deve possuir um total de 6 caracteres',
        error: true,
      });
    } else if (validatePassword(password)) {
      setMessage({
        message: 'A Nova senha precisa pelo menos 6 caracteres',
        error: true,
      });
    } else if (equalityPassword(password, passwordR)) {
      setMessage({
        message: 'As senhas concedidas não conferem',
        error: true,
      });
    } else {
      try {
        const change = await axios.post(
          'http://localhost:3333/users/change-password',
          {
            user_email: email,
            code_email: emailCode.toUpperCase(),
            new_password: password,
          },
        );
        
        setEmail('');
        setPassword('');
        setPasswordR('');
        setEmailCode('');

        const positiveMessage = 'Senha alterada com sucesso, redirecionando...';

        setMessage({
          message: change.data.message,
          error: change.data.message === positiveMessage,
        });

        localStorage.setItem(
          'token_safari',
          JSON.stringify(change.data.token)
        );

        dispatch(addDataUser({
          user_firstName: change.data.user_firstName,
          user_lastName: change.data.user_lastName,
          user_email: change.data.user_email,
          user_dateOfBirth: change.data.user_DateOfBirth,
          user_type: change.data.user_type,
        }));
        dispatch(statusLogin(false));
        dispatch(statusChange(false));

      } catch(error: any) {
        setMessage(error);
      }
    }

    setTimeout(() => {
      setMessage({
        message: '',
        error: true,
      });
    }, 4000);
  };

  return(
    <div
      className="fixed right-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full flex-col bg-white z-50 flex items-center justify-center px-7"
    >
      <IoIosArrowForward
        className="fixed right-0 top-0 m-5 text-3xl cursor-pointer"
        onClick={ () => dispatch(statusChange(false)) }
      />
        <img
          src={require('../images/elephant.png')}
          className="w-14 mb-3"
          alt=""
        />
        <p className="text-center">Digite o Email cadastrado</p>
        <input
          type="email"
          className="mt-2 mb-5 py-1 text-center w-full border-black border-2"
          placeholder="Código"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <p className="text-center">Digite o código recebido via Email</p>
        <input
          type="text"
          className="mt-2 mb-5 py-1 text-center w-full border-black border-2"
          placeholder="Código"
          value={ emailCode }
          onChange={ (e) => setEmailCode(e.target.value) }
        />
        <p>Digite a Nova Senha</p>
        <input
          type="password"
          className="w-full py-1 text-center border-black border-2 mt-2 mb-5"
          placeholder="Nova Senha"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <p>Repita a Nova Senha</p>
        <input
          type="password"
          className="mt-2 py-1 text-center w-full border-black border-2"
          placeholder="Repita a Senha"
          value={ passwordR }
          onChange={ (e) => setPasswordR(e.target.value) }
        />
        <button
          type="button"
          onClick={ changePassword }
          className="w-full bg-black py-1 mt-8 text-white"
        >
          Alterar Senha
        </button>
        <div className={ ` mt-10 font-bold ${message.error ? 'text-red-900': 'text-green-900'} text-center `}>
          { message.message }
        </div>
    </div>
  );
};