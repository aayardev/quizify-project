"use client";

import {
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  Plus,
  PlusCircleIcon,
} from "lucide-react";
import BaseCarousel, { type CarouselProps } from "nuka-carousel";
import { Card } from "./ui/card";
import useMediaQuery from "@/hooks/use-media-query";

type Props = CarouselProps & {
  showSeeAllBtn: boolean;
};

const Carousel = ({ children, showSeeAllBtn = false, ...props }: Props) => {
  const { sm, md, lg } = useMediaQuery();

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
      {showSeeAllBtn && (
        <Card className="h-full flex items-center justify-center">
          <button className="text-sm mt-1.5 font-medium ">
            <PlusCircleIcon className="w-4 h-4 inline-block mr-1" />
            See all
          </button>
        </Card>
      )}
    </BaseCarousel>
  );
};

export default Carousel;
