import React from "react";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import Categories from "./Categories";

export default function Header() {
  return(
    <header>
      <div className="flex items-center justify-center w-full py-3">
        <span className="text-sm">Pague também com</span>
        <img
          src={ require('../images/pix.png') }
          alt="Pix"
          className="w-20 pl-2"
        />
      </div>
      <div className="bg-green-500 w-full flex items-center justify-between px-10 py-5">
        <div className="flex items-center justify-center gap-3">
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
        <div className="flex justify-center items-center text-2xl gap-3">
          <AiOutlineHeart className="cursor-pointer" />
          <AiOutlineUser className="cursor-pointer" />
          <AiOutlineShoppingCart className="cursor-pointer" />
        </div>
      </div>
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
    </header>
  );
}