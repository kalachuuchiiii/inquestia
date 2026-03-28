import type { UseEmblaCarouselType } from "node_modules/embla-carousel-react/cjs";
import { useEffect, useState } from "react";

export const useCarouselIndex = () => {
  const [api, setApi] = useState<any>(null);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (!api) return;

    setIndex(api.selectedScrollSnap());
    api.on("select", () => {
      setIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return {
    setApi,
    index
  }
};
