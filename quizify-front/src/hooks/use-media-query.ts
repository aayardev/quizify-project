import { useMediaQuery as useMediaQueryBase } from "usehooks-ts";

const useMediaQuery = () => {
  const sm = useMediaQueryBase("(max-width: 639px)");
  const md = useMediaQueryBase("(max-width: 767px)");
  const lg = useMediaQueryBase("(max-width: 1023px)");

  return {
    sm,
    md,
    lg,
  };
};

export default useMediaQuery;
