import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Image from "next/future/image";
import React, { useCallback } from "react";
import { Image as ImageType } from "contentlayer/generated";

type CarouselProps = {
  options?: EmblaOptionsType;
  images: ImageType[];
};

function Carousel({ options, images }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden drop-shadow-lg">
        <div className="flex items-center">
          {images.map((image) => (
            <div
              className="relative ml-2 shrink-0 basis-full hover:cursor-grab active:cursor-grabbing md:my-4 md:ml-4 md:basis-4/5"
              key={image.src}
            >
              <Image
                alt="Carousel Image"
                className="rounded-md"
                priority
                style={{ aspectRatio: `${16}/${9}` }}
                src={image.src}
                width={(image.width / image.height) * 800}
                height={800}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        type="button"
        className="absolute bottom-1/2 ml-4 inline-flex translate-y-3 items-center rounded-full border border-transparent bg-slate-600/50 p-2 text-base font-medium text-white shadow-sm backdrop-blur-md hover:bg-slate-700/50 sm:p-3"
      >
        <svg
          className="h-2 w-2 sm:h-4 sm:w-4"
          viewBox="137.718 -1.001 366.563 644"
        >
          <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
        </svg>
      </button>

      <button
        onClick={scrollNext}
        type="button"
        className="xs:text-base absolute bottom-1/2 right-0 mr-4 inline-flex translate-y-3 items-center rounded-full border border-transparent bg-slate-600/50 p-2 font-medium text-white shadow-sm backdrop-blur-md hover:bg-slate-700/50 sm:p-3"
      >
        <svg className="h-2 w-2 sm:h-4 sm:w-4" viewBox="0 0 238.003 238.003">
          <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
        </svg>
      </button>
    </div>
  );
}

export default Carousel;
