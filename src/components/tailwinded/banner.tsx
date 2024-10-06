import { useEffect, useState } from "react";
import getBanner, { type bannerType } from "@/util/getBanner";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BannerReact() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [banners, setBanners] = useState<bannerType[]>([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isHoveredPrevious, setIsHoveredPrevious] = useState(false);
  const [isHoveredNext, setIsHoveredNext] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      const data = await getBanner();
      setBanners(data);
      resetInterval();
    };

    fetchBanner();

    const fetchInterval = setInterval(fetchBanner, 0.50 * 60 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(fetchInterval);
  }, []);

  useEffect(() => {
    if (banners.length !== 0) {
      const id = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 15000);
      setIntervalId(id);

      return () => clearInterval(id);
    }
  }, [banners.length]);

  const resetInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    if (banners.length !== 0) {
      const id = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 15000);
      setIntervalId(id);
    } else {
      if (banners.length < currentBanner) {
        setCurrentBanner(0);
      }
    }
  };

  const handlePrevious = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    resetInterval();
  };

  const handleNext = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
    resetInterval();
  };

  const hasBanners = banners.length > 0;

  if (!hasBanners) {
    return null;
  }

  return (
    <div>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          height: "200px", // Adjust height based on your banner content
        }}
      >
        <AnimatePresence>
          {banners.map((banner, index) => {
            if (index === currentBanner) {
              return (
                <motion.div
                  key={banner.title}
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: banner.color,
                    color: invertColor(banner.color),
                    padding: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ flexBasis: "33.333333%" }}>
                      {banners.length > 1 && (
                        <button
                          onClick={handlePrevious}
                          onMouseEnter={() => setIsHoveredPrevious(true)}
                          onMouseLeave={() => setIsHoveredPrevious(false)}
                          style={{
                            height: "100%",
                            width: "100%",
                            backgroundColor: isHoveredPrevious
                              ? "rgba(0, 0, 0, 0.1)"
                              : "transparent",
                            border: "none",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                          }}
                        >
                          <ArrowLeft
                            height='100%'
                            color={invertColor(banner.color)}
                          />
                        </button>
                      )}
                    </div>
                    <div style={{ flexBasis: "33.333333%" }}>
                      <h3>{banner.title}</h3>
                      <p
                        dangerouslySetInnerHTML={{ __html: banner.description }}
                      ></p>
                    </div>
                    <div style={{ flexBasis: "33.333333%" }}>
                      {banners.length > 1 && (
                        <button
                          onClick={handleNext}
                          onMouseEnter={() => setIsHoveredNext(true)}
                          onMouseLeave={() => setIsHoveredNext(false)}
                          style={{
                            height: "100%",
                            width: "100%",
                            backgroundColor: isHoveredNext
                              ? "rgba(0, 0, 0, 0.1)"
                              : "transparent",
                            border: "none",
                            cursor: "pointer",
                            transition: "background-color 0.3s",
                          }}
                        >
                          <ArrowRight
                            height='100%'
                            color={invertColor(banner.color)}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            }
            return null;
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function invertColor(hex: string) {
  if (hex === "#E26FD6") {
    return "#000000";
  }
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const invertedR = (255 - r).toString(16).padStart(2, "0");
  const invertedG = (255 - g).toString(16).padStart(2, "0");
  const invertedB = (255 - b).toString(16).padStart(2, "0");

  return `#${invertedR}${invertedG}${invertedB}`;
}
