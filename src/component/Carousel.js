import React, { useRef } from "react";

const Carousel = ({ trendingCoins }) => {
  const carouselRef = useRef(null);

  const handleMoveLeft = () => {
    if (carouselRef.current.scrollLeft <= 0) {
      carouselRef.current.scrollLeft = carouselRef.current.scrollWidth;
    } else {
      carouselRef.current.scrollLeft -= 500; // Adjust the scroll amount as needed
    }
  };

  const handleMoveRight = () => {
    if (
      carouselRef.current.scrollLeft >=
      carouselRef.current.scrollWidth - carouselRef.current.clientWidth
    ) {
      carouselRef.current.scrollLeft = 0;
    } else {
      carouselRef.current.scrollLeft += 500; // Adjust the scroll amount as needed
    }
  };

  const extractPrice = (priceString) => {
    const priceParts = priceString.split("<");
    return priceParts[0];
  };

  return (
    <div className="relative overflow-hidden w-full">
      <img
        src="images/img_button_next_slide.svg"
        alt="left_one"
        className="h-[44px] absolute mt-[9vh] ml-[2vh] cursor-pointer z-10"
        onClick={handleMoveLeft}
      />
      <img
        src="images/img_button_next_slide_white_a700.svg"
        alt="right_one"
        className="h-[44px] absolute right-0 mt-[9vh] mr-[2vh] cursor-pointer z-10"
        onClick={handleMoveRight}
      />
      <div
        ref={carouselRef}
        className="flex flex-row space-x-6 overflow-x-hidden"
        style={{ whiteSpace: "nowrap" }}
      >
        {trendingCoins.map((coin, index) => (
          <div
            key={index}
            className="w-full h-[25vh] rounded-lg bg-white border border-gray-300 p-4 shadow-md"
            style={{ minWidth: "50vh" }}
          >
            <div className="flex flex-row space-x-1">
              <img
                src={coin.item.thumb}
                alt={coin.item.name}
                className="w-[3vh] object-cover"
              />
              <p>{coin.item.symbol}</p>
              <div
                className={`bg-${
                  coin.item.data.price_change_percentage_24h.usd > 0
                    ? "green"
                    : "red"
                }-100 h-[3vh] w-[6vh] flex items-center justify-center`}
              >
                <div
                  className={`text-${
                    coin.item.data.price_change_percentage_24h.usd > 0
                      ? "green"
                      : "red"
                  }-600 text-xs font-medium`}
                >
                  {coin.item.data.price_change_percentage_24h.usd > 0
                    ? `+${coin.item.data.price_change_percentage_24h.usd.toFixed(
                        2
                      )}%`
                    : `${coin.item.data.price_change_percentage_24h.usd.toFixed(
                        2
                      )}%`}
                </div>
              </div>
            </div>
            <p className="text-xl font-medium mt-1">
              {extractPrice(coin.item.data.price)}
            </p>
            <img
              src={coin.item.data.sparkline}
              alt="Price Graph"
              className="h-[70px] mt-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;