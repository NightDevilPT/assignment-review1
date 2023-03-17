import React, { useEffect, useRef, useState } from "react";
import Rating from '@mui/material/Rating';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./style.css"

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

import axios from "axios";

import { FaUserCircle } from "react-icons/fa";


export default function App() {

  const[data,setData]=useState([]);

  useEffect(()=>{
    axios.get("https://admin.tomedes.com/api/v1/get-reviews?page=1").then(res=>{
      setData(res.data.data);
    }).catch(err=>{
      console.log(err);
    })
    console.log(data)
  },[])

  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {
          data?.map((items,index)=>{
            return(
              <SwiperSlide key={items.ID+"_"+index}>
                <div className="image-div">
                  <span></span>
                  {
                    items.Image?
                    <img src={data.img} className="user-image"/>:
                    <FaUserCircle className="user-image" />
                  }
                </div>
                <div className="rating-div">
                  <Rating className="rating-div" name="simple-controlled" value={items.rating} readOnly/>
                </div>
                <div className="user-detail-div">
                  <h2>{items.Name}</h2>
                  <h3>{items.Company}</h3>
                </div>
                <div className="review-div">
                  <span>
                    {
                      items.Reviews
                    }
                  </span>
                </div>
                <div className="review-date-div">
                  <span>{
                    new Date(items.datecreated).getDate()+"/"+new Date(items.datecreated).getMonth()+"/"+new Date(items.datecreated).getFullYear()
                  }</span>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  );
}

