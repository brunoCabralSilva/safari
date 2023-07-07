import React from "react";
import Header from "../components/Header";
import Categories from "../components/Categories";

export default function Home() {
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