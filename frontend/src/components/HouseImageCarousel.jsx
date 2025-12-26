import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // optional icons

export default function HouseImageCarousel({ images = [] }) {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((old) => (old === 0 ? images.length - 1 : old - 1));
  };

  const next = () => {
    setIndex((old) => (old === images.length - 1 ? 0 : old + 1));
  };

  if (images.length === 0) {
    return (
      <img
        src="https://via.placeholder.com/600x400"
        className="w-full rounded-lg object-contain"
        alt="House"
      />
    );
  }

  return (
    <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden">
      
      {/* IMAGE */}
      <img
        src={images[index]}
        alt="House"
        className="w-full h-full object-contain transition-all duration-500"
      />

      {/* TOP & BOTTOM SHADOWS */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

      {/* LEFT ARROW */}
      {images.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* RIGHT ARROW */}
      {images.length > 1 && (
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* DOT INDICATORS */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
