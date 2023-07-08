import React from 'react';

export default function Footer() {
  return(
    <footer className="bg-black flex items-center justify-center flex-col text-white text-sm md:flex-row md:justify-between px-5 py-2">
      <div>
        <img
          src={require('../images/white-elephant.png')}
          alt="Logo do Safari"
          className="w-12"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-end justify-center text-center">
        <span>© 2023 Copyright - Bruno Cabral</span>
        <span className="hidden md:flex px-2">|</span>
        <span>bruno.cabral.silva2018@gmail.com</span>
        <span className="hidden md:flex px-2">|</span>
        <span>+ 55 (83) 9 9836-4408</span>
      </div>
    </footer>
  );
}
  