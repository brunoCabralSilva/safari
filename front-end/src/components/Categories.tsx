import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Categories() {
  return(
    <section className="bg-green-500 flex justify-center">
      <Swiper
        breakpoints={{
          // when window width is >= 320px
          100: {
            slidesPerView: 1,
            spaceBetween: 4,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 4
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 7,
            spaceBetween:0,
          }}}
        loop={true}
        className="swiper-content"
        navigation={true}
        modules={[Navigation, Pagination]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
      >
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/audio.png') }
              className=""
              alt=""
            />
            <span className="">
              Audio
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/bebes.png') }
              className=""
              alt=""
            />
            <span className="">
              Bebês
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/beleza.png') }
              className=""
              alt=""
            />
            <span className="">
              Beleza
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/brinquedos.png') }
              className=""
              alt=""
            />
            <span className="">
              Brinquedos
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/cameba.png') }
              className=""
              alt=""
            />
            <span className="">
              Cama e Banho
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/esportes.png') }
              className=""
              alt=""
            />
            <span className="">
              Esportes
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/games.png') }
              className=""
              alt=""
            />
            <span className="">
              Games
            </span>
          </div>
        </SwiperSlide>
        {/* <SwiperS>
        <d lide className="flex items-center justify-center flex-col"iv>
        </div
              src={ require('../images/categories/ico-eletrodom.png') }
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
          <d  className="flex items-center justify-center flex-col"iv>
          </div
              src={ require('../images/categories/ico-limpeza.png') }
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
          <d  className="flex items-center justify-center flex-col"iv>
          </div
              src={ require('../images/categories/ico-pneu.png') }
              alt=""
            />
          </SwiperSlide> */}
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/info.png') }
              alt=""
            />
            <span className="">
              Informática
            </span>
          </div>
        </SwiperSlide>  
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/iphone.png') }
              alt=""
            />
            <span className="">
              Iphone
            </span>
          </div>
        </SwiperSlide>  
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/mercado.png') }
              alt=""
            />
            <span className="">
              Mercado
            </span>
          </div>
        </SwiperSlide>  
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/moda.png') }
              alt=""
            />
            <span className="">
              Moda
            </span>
          </div>
        </SwiperSlide>  
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/moveis.png') }
              alt=""
            />
            <span className="">
              Móveis
            </span>
          </div>
        </SwiperSlide>  
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/perfumes.png') }
              alt=""
            />
            <span className="">
              Perfumes
            </span>
          </div>
        </SwiperSlide>  
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/portateis.png') }
              alt=""
            />
            <span className="">
              Portáteis
            </span>
          </div>
          </SwiperSlide>  
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/smartphone.png') }
              alt=""
            />
            <span className="">
              Smartphone
            </span>
          </div>
        </SwiperSlide>  
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/telas.png') }
              alt=""
            />
            <span className="">
              Smart Tv's
            </span>
          </div>
        </SwiperSlide>  
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col hover:underline hover:decoration-1 underline-offset-2">
            <img
              src={ require('../images/categories/ud.png') }
              alt=""
            />
            <span className="">
              Utilidades
            </span>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}