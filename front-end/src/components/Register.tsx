import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { addDataUser, statusRegister } from "../redux/slice";
import { useDispatch } from "react-redux";
import { equalityPassword, validateCpf, validateDate, validateEmail, validateName, validatePassword } from "./registerValidation";
import axios from "axios";

export default function Register() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('0000-00-00');
  const [password, setPassword] = useState('');
  const [passwordR, setPasswordR] = useState('');
  const [errFirstName, setErrFirstName] = useState('none');
  const [errLastName, setErrLastName] = useState('none');
  const [errEmail, setErrEmail] = useState('none');
  const [errCpf, setErrCpf] = useState('none');
  const [errDateOfBirth, setErrDateOfBirth] = useState('none');
  const [errPassword, setErrPassword] = useState('none');
  const [errPasswordR, setErrPasswordR] = useState('none');

  const validations = () => {
    if (validateEmail(email)) {
      setErrEmail('Necessário fornecer um Email válido');
    } else setErrEmail('');
    
    if (validateName(firstName)) {
      setErrFirstName('O nome precisa ter pelo menos 2 caracteres');
    } else setErrFirstName('');

    if (validateName(lastName)) {
      setErrLastName('O nome precisa ter pelo menos 2 caracteres');
    } else setErrLastName('');

    if (validateCpf(cpf)) {
      setErrCpf('O CPF precisa ter 11 caracteres');
    } else setErrCpf('');

    if (validateDate(dateOfBirth)) {
      setErrDateOfBirth('Data de Nascimento inválida para o cadastro');
    } else setErrDateOfBirth('');
  
    if (equalityPassword(password, passwordR)) {
      setErrPassword('Senhas inseridas não são semelhantes');
      setErrPasswordR('Senhas inseridas não são semelhantes');
    } else {
      if (validatePassword(password)) setErrPassword("Necessário inserir uma senha com pelo menos 6 caracteres");
      else setErrPassword('');
  
      if (validatePassword(passwordR)) setErrPasswordR("Necessário inserir uma senha com pelo menos 6 caracteres");
      else setErrPasswordR('');
    }

    return !(validateEmail(email) || validateName(firstName) || validateName(lastName) || validateCpf(cpf) || validateDate(dateOfBirth) ||equalityPassword(password, passwordR) || validatePassword(password) || validatePassword(passwordR));
  };

  const register = async () => {
    const validation = validations();
    if (validation) {
      try {
        const createUser = await axios.post(
          'http://localhost:3333/users/create',
          {
            user_cpf: cpf,
            user_firstName: firstName.toLowerCase(),
            user_lastName: lastName.toLowerCase(),
            user_email: email.toLowerCase(),
            user_password: password,
            user_DateOfBirth: dateOfBirth,
          }
        );
        dispatch(addDataUser({
          user_firstName: createUser.data.user_firstName,
          user_lastName: createUser.data.user_lastName,
          user_email: createUser.data.user_email,
          user_dateOfBirth: createUser.data.user_DateOfBirth,
          user_type: createUser.data.user_type,
        }));
        localStorage.setItem(
          'token_safari',
          JSON.stringify(createUser.data.token),
        );
      } catch(error: any) {
        window.alert(error.response.data.message);
      }
    }
  };

  const borderInput = (message: string) => {
    if (message === 'none') {
      return 'border-black';
    } else if (message === '') {
    return 'border-green-800';
    } return 'border-red-800';
  };

  return(
    <div
      className="fixed right-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 min-h-full flex-col bg-white z-50 flex items-center justify-center px-7 text-xs"
    >
      <IoIosArrowForward
        className="fixed right-0 top-0 m-5 text-3xl cursor-pointer"
        onClick={ () => dispatch(statusRegister(false)) }
      />
      <img
          src={require('../images/elephant.png')}
          className="w-14 mb-3"
          alt=""
      />
      <p className="mt-1 text-red-800 font-bold text-center">
        {errFirstName !== 'none' && errFirstName}
      </p>
      <input
        type="text"
        className={`mt-1 mb-2 py-1 text-center w-full ${borderInput(errFirstName)} border-2`}
        placeholder="Primeiro Nome"
        value={ firstName }
        onChange={ (e) => setFirstName(e.target.value) }
      />
      <p className="mt-1 text-red-800 font-bold text-center">
        {errLastName !== 'none' && errLastName }
      </p>
      <input
        type="text"
        className={`mt-1 mb-2 py-1 text-center w-full ${borderInput(errLastName)} border-2`}
        placeholder="Último Nome"
        value={ lastName }
        onChange={ (e) => setLastName(e.target.value) }
      />
      <p className="mt-1 text-red-800 font-bold text-center">
        {errEmail !== 'none' && errEmail}
      </p>
      <input
        type="text"
        className={`mt-1 mb-2 py-1 text-center w-full ${borderInput(errEmail)} border-2`}
        placeholder="Email"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
      />
      <p className="mt-1 text-red-800 font-bold text-center">
        {errCpf !== 'none' && errCpf}
      </p>
      <input
        type="password"
        className={`mt-1 mb-2 py-1 text-center w-full ${borderInput(errCpf)} border-2`}
        placeholder="CPF"
        value={ cpf }
        onChange={ (e) => setCpf(e.target.value) }
      />
      <p className="mt-1 text-red-800 font-bold text-center">
        {errDateOfBirth !== 'none' && errDateOfBirth}
      </p>
      <input
        type="date"
        className={`mt-1 mb-2 py-1 text-center w-full ${borderInput(errDateOfBirth)} border-2`}
        placeholder="Data de Nascimento"
        value={ dateOfBirth }
        onChange={ (e) => setDateOfBirth(e.target.value) }
      />
      <p className="mt-1 text-red-800 font-bold text-center">
        {errPassword !== 'none' && errPassword}
      </p>
      <input
        type="password"
        className={`mt-1 mb-2 py-1 text-center w-full ${borderInput(errPassword)} border-2`}
        placeholder="Senha"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
      />
      <p className="mt-1 text-red-800 font-bold text-center">
        {errPasswordR !== 'none' && errPasswordR}
      </p>
      <input
        type="password"
        className={`mt-1 mb-2 py-1 text-center w-full ${borderInput(errPasswordR)} border-2`}
        placeholder="Repita a Senha"
        value={ passwordR }
        onChange={ (e) => setPasswordR(e.target.value) }
      />
      <button
        type="button"
        onClick={ register }
        className="w-full bg-black py-1 mt-4 text-white"
      >
        Cadastrar Usuário
      </button>
    </div>
  );
};