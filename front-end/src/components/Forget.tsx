import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { statusForget } from "../redux/slice";
import { useDispatch } from "react-redux";

export default function Register() {
  const dispatch = useDispatch();
  return(
    <div
      className="fixed right-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full flex-col bg-white z-50 flex items-center justify-center px-7"
    >
      <IoIosArrowForward
        className="fixed right-0 top-0 m-5 text-3xl cursor-pointer"
        onClick={ () => dispatch(statusForget(false)) }
      />
        Esqueci a Senha
    </div>
  );
};