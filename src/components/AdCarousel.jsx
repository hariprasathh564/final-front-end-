// import React, { useEffect, useState } from "react";

// export default function AdCarousel() {
//   const ads = [
//     {
//       id: 1,
//       image: "https://rita.com.vn/images/Poster_Milk_Soda_from_Rita_beverage_.webp",
//       link: "/products/grape-milk-soda",
//     },
//     {
//       id: 2,
//       image: "https://www.shutterstock.com/image-vector/bubble-milk-tea-banner-ads-260nw-1524967340.jpg",
//       link: "/products/mango-milk-soda",
//     },
//     {
//       id: 3,
//       image: "https://t3.ftcdn.net/jpg/02/29/85/92/360_F_229859205_HMLQpZ2MPvtXKERGLbrNFm8FDgmtl4Bt.jpg",
//       link: "/offers",
//     },
//   ];

//   const [index, setIndex] = useState(0);

//   // Auto slide every 3 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % ads.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [ads.length]);

//   return (
//     <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-lg">

//       {ads.map((ad, i) => (
//         <a
//           key={ad.id}
//           href={ad.link}
//           className={`absolute inset-0 transition-opacity duration-700 ease-in-out 
//             ${i === index ? "opacity-100" : "opacity-0"}`}
//         >
//           <img
//             src={ad.image}
//             alt="Milk Soda Advertisement"
//             className="w-full h-full object-cover"
//           />
//         </a>
//       ))}

//       {/* Small dots at bottom */}
//       <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
//         {ads.map((_, i) => (
//           <div
//             key={i}
//             className={`w-3 h-3 rounded-full transition-all 
//               ${i === index ? "bg-white scale-110" : "bg-white/50"}`}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// }













import React, { useEffect, useState, useRef } from "react";
import API from "../api/axiosClient";

export default function AdCarousel() {
  const [ads, setAds] = useState([]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const autoplaySpeed = 3000; // 3.5 sec
  const carouselRef = useRef(null);

  // Fetch ads from backend
  useEffect(() => {
    API.get("/ads")
      .then((res) => setAds(res.data))
      .catch((err) => console.error("Failed to load ads", err));
  }, []);

  // Auto slide with pause on hover
  useEffect(() => {
    if (isPaused || ads.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, autoplaySpeed);

    return () => clearInterval(timer);
  }, [ads, isPaused]);

  // Manual slide with animation easing
  const nextSlide = () => setIndex((prev) => (prev + 1) % ads.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + ads.length) % ads.length);

  return (
    <div
      ref={carouselRef}
      className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-xl shadow-xl select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {ads.map((ad, i) => (
        <a
          href={ad.link || "#"}
          key={i}
          className={`
            absolute inset-0 transition-all duration-[900ms] ease-in-out
            ${i === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
          `}
        >
          {/* Banner Image */}
          <img
            src={ad.image}
            alt="Advertisement"
            className="w-full h-full object-cover"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center px-6 md:px-12 text-white">
            <h2 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
              {ad.title || "Milk Soda Special"}
            </h2>

            <p className="mt-2 text-sm md:text-lg max-w-xl drop-shadow">
              {ad.subtitle || "Fresh, Fizzy, and Delightfully Smooth!"}
            </p>

            {ad.buttonText && (
              <a
                href={ad.buttonLink || "#"}
                className="mt-4 w-fit bg-white text-black font-semibold px-4 py-2 md:px-5 md:py-2.5 rounded-lg shadow hover:bg-gray-200 transition"
              >
                {ad.buttonText}
              </a>
            )}
          </div>
        </a>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {ads.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all 
              ${i === index ? "bg-white scale-125" : "bg-white/50"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
