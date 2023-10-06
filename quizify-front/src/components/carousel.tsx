"use client";

import {
  ChevronLeftCircleIcon,
  ChevronRight,
  ChevronRightCircleIcon,
} from "lucide-react";
import BaseCarousel, { type CarouselProps } from "nuka-carousel";
import React, { type ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";

const Carousel = ({ children, ...props }: CarouselProps) => {
  const sm = useMediaQuery("(max-width: 639px)");
  const md = useMediaQuery("(max-width: 767px)");
  const lg = useMediaQuery("(max-width: 1023px)");
  let slidesToShow = 4;

  if (sm) slidesToShow = 1;
  else if (md) slidesToShow = 2;
  else if (lg) slidesToShow = 3;
  else slidesToShow = 4;

  return (
    <BaseCarousel
      {...props}
      slidesToShow={slidesToShow}
      cellSpacing={10}
      defaultControlsConfig={{
        pagingDotsClassName: "!hidden",
      }}
      // withoutControls
      renderCenterRightControls={({ nextSlide, nextDisabled }) =>
        nextDisabled ? null : (
          <button
            onClick={nextSlide}
            className="bg-white dark:bg-slate-950 shadow-md p-1.5 rounded-full -mr-2"
          >
            <ChevronRightCircleIcon className="text-primary" />
          </button>
        )
      }
      renderCenterLeftControls={({ previousSlide, previousDisabled }) =>
        previousDisabled ? null : (
          <button
            onClick={previousSlide}
            className="bg-white dark:bg-slate-950 shadow-md p-1.5 rounded-full -ml-2"
          >
            <ChevronLeftCircleIcon className="text-primary" />
          </button>
        )
      }
      renderCenterCenterControls={() => null}
    >
      {children}
    </BaseCarousel>
  );
};

export default Carousel;
