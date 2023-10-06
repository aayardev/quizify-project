"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { type ReactNode } from "react";
import BaseSlider from "react-slick";

type Props = {
  children: ReactNode;
};
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};
const Slider = ({ children }: Props) => {
  return <BaseSlider {...settings}>{children}</BaseSlider>;
};

export default Slider;
