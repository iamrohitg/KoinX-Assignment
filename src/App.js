import React, { useState, useEffect } from "react";

import TradingViewWidget from "./component/TradingViewWidget";
import GetStartedContainer from "./component/GetStartedContainer";
import Carousel from "./component/Carousel";

function App() {
  const [cryptoData, setCryptoData] = useState({});
  const [coins, setCoins] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState("D");

  useEffect(() => {
    // Fetch data initially
    fetchCryptoData();
    fetchCoins();

    // Update data every 2 seconds
    const interval = setInterval(() => {
      fetchCryptoData();
      fetchCoins();
    }, 20000);

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, []);

  // Functions for API call
  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr%2Cusd&include_24hr_change=true"
      );
      const data = await response.json();
      setCryptoData(data.bitcoin);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchCoins = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/search/trending"
      );
      const data = await response.json();
      setCoins(data.coins);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Sort coins by market_cap_rank and take the top 3
  const top3Coins = coins
    .sort((a, b) => a.item.market_cap_rank - b.item.market_cap_rank)
    .slice(0, 3);

  const intervals = ["1H", "24H", "7D", "1M", "3M", "6M", "1Y", "ALL"];

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
  };

  const menuItems = [
    { label: "Overview" },
    { label: "Fundamentals" },
    { label: "News Insights" },
    { label: "Sentiments" },
    { label: "Team" },
    { label: "Technicals" },
    { label: "Tokenomics" },
  ];

  console.log("debug", coins);

  return (
    <div className="flex flex-col">
      {/* navbar */}
      <nav className="p-3 flex items-center justify-between border-gray-300 border-b border-solid bg-white shadow-md">
        <div className="pl-4">
          <img
            src="images/img_1_koinx_logo.png"
            alt="1koinxlogo_one"
            className="w-1/3 object-cover pl-4"
          />
        </div>
        <div className="flex flex-row pr-10">
          <ul className="flex items-center space-x-10 list-none pr-10">
            <li>
              <a
                href="#"
                className="text-black font-medium hover:text-gray-700 transition duration-300 font-sans"
              >
                Crypto Taxes
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-black font-medium hover:text-gray-700 transition duration-300 font-sans"
              >
                Free Tools
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-black font-medium hover:text-gray-700 transition duration-300 font-sans"
              >
                Resources Center
              </a>
            </li>
          </ul>
          <button className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-600 font-sans font-medium transition duration-300">
            Get Started
          </button>
        </div>
      </nav>

      {/* Body */}
      <div className="flex flex-row pl-10 mt-3">
        <a href="#">
          <div className="text-gray-500 font-medium">Cryptocurrencies</div>
        </a>
        <img
          src="images/img_icon.svg"
          alt="icon_one"
          className="h-[12px] w-[30px] mt-2"
        />
        <div className="font-medium">Bitcoin</div>
      </div>

      {/* left white container */}
      <div className="flex mt-4 mx-10">
        <div className="w-4/5 h-[108vh] rounded-lg bg-white border border-gray-300 p-8 shadow-md">
          <div className="flex flex-row">
            <img
              src="images/img_image_160.png"
              alt="image160_one"
              className="w-[40px] object-cover"
            />
            <div className="px-2 text-3xl font-medium">Bitcoin</div>
            <div className="text-gray-600 font-medium text-lg mt-2 pr-8">
              BTC
            </div>
            <button className="bg-gray-500 text-white py-2 px-4 rounded-lg font-sans font-medium">
              Rank #1
            </button>
          </div>
          <div className="flex flex-row mt-8">
            <div className="font-medium text-3xl pr-8">
              $ {new Intl.NumberFormat().format(cryptoData?.usd)}
            </div>
            <button className="flex flex-row bg-green-100 px-2 text-green-500 rounded-sm font-sans font-medium">
              <img
                src="images/img_polygon_2.svg"
                alt="Polygon 2"
                className=" mt-3 p-1"
              />
              <p className="mt-1 font-medium text-lg px-1">
                {cryptoData.usd_24h_change?.toFixed(2)}%
              </p>
            </button>
            <p className="text-gray-400 mt-1 px-4 font-medium">(24H)</p>
          </div>
          <p className="mt-2 text-lg font-medium">
            ₹ {new Intl.NumberFormat().format(cryptoData?.inr)}
          </p>
          <hr className="my-6 border-gray-300" />
          <div className="flex justify-between">
            <div className="text-lg font-medium">Bitcoin Price Chart (USD)</div>
            <div className="flex flex-row space-x-4 text-sm text-gray-400 font-medium">
              {intervals.map((interval, index) => (
                <ul key={index} className="cursor-pointer hover:text-blue-700" onClick={() => handleIntervalChange(interval)}>
                  {interval}
                </ul>
              ))}
            </div>
          </div>
          {/* TradingViewWidget component */}
          <div className="mt-5 w-[58rem] h-[30rem]">
            <TradingViewWidget selectedInterval={selectedInterval} />
          </div>
        </div>

        {/* content for blue container */}
        <div className="flex flex-col ml-5 w-1/3 items">
          <GetStartedContainer />

          {/* top 3 trending Coins */}
          <div className="rounded-2xl h-[32vh] bg-white border border-gray-300 p-6 shadow-md">
            {/* Content for the white container */}
            <div className="text-2xl font-medium mb-4">
              Trending Coins (24H)
            </div>
            {top3Coins.map((coin) => (
              <div
                key={coin.item.id}
                className="flex flex-row justify-between items-center w-full space-y-[3vh]"
              >
                <div className="flex flex-row justify-start items-center gap-1.5">
                  <button className="w-[24px]">
                    <img src={coin.item.thumb} alt={coin.item.name} />
                  </button>
                  <div size="2xl" as="p" className="text-gray-900 font-medium">
                    {coin.item.name} ({coin.item.symbol})
                  </div>
                </div>
                <div className="flex flex-row bg-green-100 h-[3vh] py-2 px-4 w-[9vh] flex items-center justify-center">
                  <img
                    src="images/img_polygon_2.svg"
                    alt="Polygon 2"
                    className="px-1"
                  />
                  <div className="text-green-600 text-xs font-medium">
                    {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row mt-6 pl-10 text-gray-600 font-medium">
        {menuItems.map((item, index) => (
          <ul
            key={index}
            className={`hover:text-blue-800 hover:border-b-2 hover:border-blue-800 cursor-pointer ${
              index > 0 ? "ml-[8vh]" : ""
            }`}
          >
            {item.label}
          </ul>
        ))}
      </div>

      <hr className="my-6 ml-10 border-gray-300 w-[63rem]" />

      <div className="flex mt-4 mx-10">
        <div className="w-[63rem] h-[90vh] rounded-lg bg-white border border-gray-300 p-8 shadow-md">
          <div className="text-2xl font-medium">Performance</div>
          <div className="flex flex-row justify-between mt-5">
            <div className="flex flex-col space-y-3">
              <div className="text-gray-500 text-sm font-medium">
                Today's Low
              </div>
              <div className="text-gray-600 font-medium">46,930.22</div>
            </div>
            <div className="flex flex-col">
              <img
                src="images/img_div_pbar29range.png"
                alt="divpbar29range"
                className="w-[44rem] object-cover"
              />
              <div className="flex flex-col items-center ml-[20rem] mt-[-3vh]">
                <img src="images/img_div_absolute.svg" alt="divabsolute_one" />
                <p className="text-gray-700 font-medium text-sm mt-2">
                  $48,637.83
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-3 items-end">
              <div className="text-gray-500 text-sm font-medium">
                Today's High
              </div>
              <div className="text-gray-600 font-medium">49,343.83</div>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-5">
            <div className="flex flex-col space-y-3">
              <div className="text-gray-500 text-sm font-medium">52W Low</div>
              <div className="text-gray-600 font-medium">16,930.22</div>
            </div>
            <div className="flex flex-col">
              <img
                src="images/img_div_pbar29range.png"
                alt="divpbar29range"
                className="w-[44rem] object-cover"
              />
            </div>
            <div className="flex flex-col space-y-3 items-end">
              <div className="text-gray-500 text-sm font-medium">52W High</div>
              <div className="text-gray-600 font-medium">49,743.83</div>
            </div>
          </div>
          <div className="flex flex-row mt-[7vh]">
            <div className="text-lg text-gray-600 font-medium">
              Fundamentals
            </div>
            <img
              src="images/img_svg_margin.svg"
              alt="svgmargin_one"
              className="h-[20px] mt-1"
            />
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex flex-col space-y-4">
              <div className="flex text-sm font-medium space-x-[15.5rem]">
                <div className="text-gray-400">Bitcoin Price</div>
                <div className="text-gray-800 items-end">$16,815.46</div>
              </div>
              <hr className="border-gray-300" />
              <div className="flex text-sm font-medium space-x-[8rem]">
                <div className="text-gray-400">24h Low/ 24h High</div>
                <div className="text-gray-800 items-end">
                  $16,382.07 / $16,874.12
                </div>
              </div>
              <hr className="border-gray-300" />
              <div className="flex text-sm font-medium space-x-[9rem]">
                <div className="text-gray-400">7d Low/ 7d High</div>
                <div className="text-gray-800 items-end">
                  $16,382.07 / $16,874.12
                </div>
              </div>
              <hr className="border-gray-300" />
              <div className="flex text-sm font-medium space-x-[12rem]">
                <div className="text-gray-400">Trading Volume</div>
                <div className="text-gray-800 items-end">$23,249,202,782</div>
              </div>
              <hr className="border-gray-300" />
              <div className="flex text-sm font-medium space-x-[17rem]">
                <div className="text-gray-400">Market Cap Rank</div>
                <div className="text-gray-800 items-end">#1</div>
              </div>
              <hr className="border-gray-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex text-sm font-medium space-x-[18rem]">
                <div className="text-gray-400">Market Cap</div>
                <div className="text-gray-800 items-end">$323,507,290,047</div>
              </div>
              <hr className=" my-4 border-gray-300" />
              <div className="flex text-sm font-medium space-x-[17rem]">
                <div className="text-gray-400">Market Cap Dominance</div>
                <div className="text-gray-800 items-end">38.343%</div>
              </div>
              <hr className=" my-4 border-gray-300" />
              <div className="flex text-sm font-medium space-x-[19rem]">
                <div className="text-gray-400">Volume / Market Cap</div>
                <div className="text-gray-800 items-end">0.0718</div>
              </div>
              <hr className=" my-4 border-gray-300" />
              <div className="flex text-sm font-medium space-x-[15rem]">
                <div className="text-gray-400">All - Time High</div>
                <div>
                  <span className="text-gray-800 ml-8">$69,044.77</span>
                  <span className="text-red-500">-75.6%</span>
                  <div className="text-gray-500 text-xs">
                    Nov 10, 2021 (about 1 year)
                  </div>
                </div>
              </div>
              <hr className="mb-4 border-gray-300" />
              <div className="flex text-sm font-medium space-x-[15rem]">
                <div className="text-gray-400">All - Time Low</div>
                <div>
                  <span className="text-gray-800 ml-11">$67.81 </span>
                  <span className="text-green-500">24729.1%</span>
                  <div className="text-gray-500 text-xs">
                    Jul 06, 2013 (about 9 years)
                  </div>
                </div>
              </div>
              <hr className="border-gray-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-6 mx-10">
        <div className="w-[63rem] h-[80vh] rounded-lg bg-white border border-gray-300 p-8 shadow-md">
          <div className="text-2xl font-medium">Sentiment</div>
          <div className="flex flex-row mt-5">
            <div className="text-lg text-gray-700 font-medium">Key Events</div>
            <img
              src="images/img_svg_margin.svg"
              alt="svgmargin_one"
              className="h-[20px] mt-1"
            />
          </div>
          <div className="flex flex-row mt-5">
            <div className="w-1/2 bg-blue-100 rounded-lg mr-4 p-4 flex flex-row">
              <img
                src="images/img_aside.svg"
                alt="image"
                className="h-[147px] mr-4"
              />
              <p className="font-medium text-sm">
                Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim
                mattis enim tincidunt.
                <br />
                <br />
                <span className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est
                  faucibus metus quis. Amet sapien quam viverra adipiscing
                  condimentum. Ac consectetur et pretium in a bibendum in. Sed
                  vitae sit nisi viverra natoque lacinia libero enim.
                </span>
              </p>
            </div>

            <div className="w-1/2 bg-green-100 rounded-lg mr-4 p-4 flex flex-row">
              <img
                src="images/img_frame_1116601921.svg"
                alt="circleimage"
                className="h-[44px] w-[44px] mr-4 rounded-[50%]"
              />
              <p className="font-medium text-sm">
                Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim
                mattis enim tincidunt.
                <br />
                <br />
                <span className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est
                  faucibus metus quis. Amet sapien quam viverra adipiscing
                  condimentum. Ac consectetur et pretium in a bibendum in. Sed
                  vitae sit nisi viverra natoque lacinia libero enim.
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-row mt-7">
            <div className="text-lg text-gray-700 font-medium">
              Analyst Estimates
            </div>
            <img
              src="images/img_svg_margin.svg"
              alt="svgmargin_one"
              className="h-[20px] mt-1"
            />
          </div>
          <div className="flex flex-row mt-7">
            <div className="rounded-full bg-green-100 h-[15vh] w-[15vh] flex items-center justify-center mr-3">
              <div className="text-green-600 text-3xl font-medium">76%</div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row ml-10 text-gray-500 font-medium">
                Buy
                <div className="rounded-md bg-teal-500 h-[1vh] w-[55vh] flex items-center justify-center mt-2 mx-4"></div>
                76%
              </div>
              <div className="flex flex-row ml-10 text-gray-500 font-medium">
                Hold
                <div className="rounded-md bg-gray-300 h-[1vh] w-[5vh] flex items-center justify-center mt-2 mx-4"></div>
                8%
              </div>
              <div className="flex flex-row ml-10 text-gray-500 font-medium">
                Sell
                <div className="rounded-md bg-red-500 h-[1vh] w-[14vh] flex items-center justify-center mt-2 mx-4"></div>
                16%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-6 mx-10">
        <div className="w-[63rem] h-[135vh] rounded-lg bg-white border border-gray-300 p-8 shadow-md">
          <div className="text-2xl font-medium">About Bitcoin</div>
          <div className="text-lg font-bold mt-6">What is Bitcoin?</div>
          <p className="mt-3 text-gray-700 text-base font-medium">
            Bitcoin's price today is US$16,951.82, with a 24-hour trading volume
            of $19.14 B. BTC is +0.36% in the last 24 hours. It is currently
            -7.70% from its 7-day all-time high of $18,366.66, and 3.40% from
            its 7-day all-time low of $16,394.75. BTC has a circulating supply
            of 19.24 M BTC and a max supply of 21 M BTC.
          </p>
          <hr className="border-gray-300 my-5" />
          <div className="text-lg font-bold mt-6">
            Lorem ipsum dolor sit amet
          </div>
          <p className="mt-3 text-gray-700 text-base font-medium">
            Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit
            lobortis tristique pharetra. Diam id et lectus urna et tellus
            aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut
            sed. Quam scelerisque fermentum sapien morbi sodales odio sed
            rhoncus. Ultricies urna volutpat pendisse enim facilisi diam ut sed.
            Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus.{" "}
            <br />
            <br />
            Diam praesent massa dapibus magna aliquam a dictumst volutpat.
            Egestas vitae pellentesque auctor amet. Nunc sagittis libero
            adipiscing cursus felis pellentesque interdum. Odio cursus phasellus
            velit in senectus enim dui. Turpis tristique placerat interdum sed
            volutpat. Id imperdiet magna eget eros donec cursus nunc. Mauris
            faucibus diam mi nunc praesent massa turpis a. Integer dignissim
            augue viverra nulla et quis lobortis phasellus. Integer pellentesque
            enim convallis ultricies at.
            <br />
            <br />
            Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam
            massa vel convallis duis ac. Mi adipiscing semper scelerisque
            porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia
            congue ipsum fames amet dui. Purus ultrices tincidunt volutpat in
            eget. Ullamcorper dui
          </p>
          <hr className="border-gray-300 my-5" />
          <div className="text-2xl font-medium">Already Holding Bitcoin</div>
          <div className="flex flex-row mt-5">
            <div className="w-1/2 bg-gradient-to-r from-green-200 to-blue-500 rounded-lg mr-8 p-4 flex flex-row">
              <img
                src="images/img_rectangle_11947.png"
                alt="image"
                className="w-[128px] mt-px object-cover rounded-lg"
              />
              <div className="ml-8">
                <p className="font-medium text-white text-2xl">
                  Calculate your <br /> Profits
                </p>
                <button className="mt-4 bg-white text-black py-1 px-3 rounded-lg font-sans font-medium">
                  <div className="flex flex-row">
                    Check Now
                    <img
                      src="images/img_iconly_light_arrow_right.svg"
                      alt="Iconly/Light/Arrow - Right"
                      className="ml-2 mt-1"
                    />
                  </div>
                </button>
              </div>
            </div>
            <div className="w-1/2 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-600 rounded-lg mr-4 p-4 flex flex-row">
              <img
                src="images/img_rectangle_11947_128x128.png"
                alt="image"
                className="w-[128px] mt-px object-cover rounded-lg"
              />
              <div className="ml-8">
                <p className="font-medium text-white text-2xl">
                  Calculate your tax
                  <br /> liability
                </p>
                <button className="mt-4 bg-white text-black py-1 px-3 rounded-lg font-sans font-medium">
                  <div className="flex flex-row">
                    Check Now
                    <img
                      src="images/img_iconly_light_arrow_right.svg"
                      alt="Iconly/Light/Arrow - Right"
                      className="ml-2 mt-1"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <hr className="border-gray-300 my-5" />
          <p className="mt-3 text-gray-700 text-base font-medium">
            Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam
            massa vel convallis duis ac. Mi adipiscing semper scelerisque
            porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia
            congue ipsum fames amet dui. Purus ultrices tincidunt volutpat in
            eget. Ullamcorper dui
          </p>
        </div>
      </div>

      <div className="flex mt-6 mx-10">
        <div className="w-[63rem] h-[70vh] rounded-lg bg-white border border-gray-300 p-8 shadow-md">
          <div className="text-2xl font-medium">Tokenomics</div>
          <div className="text-lg font-medium mt-6">Initial Distribution</div>
          <div className="flex flex-row mt-4">
            <img
              src="images/img_frame_1116601936.svg"
              alt="image_three"
              className="h-[179px] w-[179px]"
            />
            <div className="flex flex-col">
              <div className="flex flex-row m-[8vh]">
                <img
                  src="images/img_span_circle_margin.svg"
                  alt="image_four"
                  className="h-[20px] w-[21px] mt-1"
                />
                <p className="text-gray-700 text-base font-medium">
                  Crowdsale investors: 80%
                </p>
              </div>
              <div className="flex flex-row mt-[-7vh] ml-[8vh]">
                <img
                  src="images/img_span_circle_margin_amber_700.svg"
                  alt="image_five"
                  className="h-[20px] w-[21px] mt-1"
                />
                <p className="text-gray-700 text-base font-medium">
                  Foundation: 20%
                </p>
              </div>
            </div>
          </div>
          <p className="mt-5 text-gray-700 text-base font-medium">
            Lorem ipsum dolor sit amet consectetur. Cras aliquet tristique
            ornare vestibulum nunc dignissim vel consequat. Leo etiam nascetur
            bibendum amet enim sit eget leo amet. At metus orci augue fusce
            eleifend lectus eu fusce adipiscing. Volutpat ultrices nibh sodales
            massa habitasse urna felis augue. Gravida aliquam fermentum augue
            eu. Imperdiet bibendum amet aliquam donec. Eget justo dui metus odio
            rutrum. Vel ipsum eget in at curabitur sem posuere facilisis vitae.
            Sed lorem sit mauris id eget arcu ut. Vulputate ipsum aliquet odio
            nisi eu ac risus.
          </p>
        </div>
      </div>

      <div className="flex mt-6 mx-10">
        <div className="w-[63rem] h-[110vh] rounded-lg bg-white border border-gray-300 p-8 shadow-md">
          <div className="text-2xl font-medium">Team</div>
          <p className="mt-5 text-gray-700 text-base font-medium">
            Lorem ipsum dolor sit amet consectetur. Id consequat adipiscing arcu
            nibh. Eget mattis in mi integer sit egestas. Proin tempor id pretium
            quam. Facilisis purus convallis quam augue.
          </p>
          <div className="w-full mt-7 bg-blue-100 rounded-lg mr-4 p-4 flex flex-row">
            <div className="flex flex-col items-center">
              <img
                src="images/img_image_209.png"
                alt="john_smith_one"
                className="w-full object-cover rounded-md"
              />
              <p className="mt-3 text-gray-800 font-medium text-sm">
                John Smith
              </p>
              <p className="text-gray-500 font-medium text-xs whitespace-nowrap">
                Designation here
              </p>
            </div>

            <p className="text-gray-700 font-medium text-sm ml-5 mt-5">
              Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit
              fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis
              in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet
              nec neque sed pellentesque viverra. Consectetur proin amet ut id
              facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu
              egestas dolor est ipsum. Malesuada etiam mi gravida praesent
              interdu
            </p>
          </div>

          <div className="w-full mt-7 bg-blue-100 rounded-lg mr-4 p-4 flex flex-row">
            <div className="flex flex-col items-center">
              <img
                src="images/img_image_209_104x96.png"
                alt="image209_one"
                className="w-full object-cover rounded-md"
              />
              <p className="mt-3 text-gray-800 font-medium text-sm">
                Elina Williams
              </p>
              <p className="text-gray-500 font-medium text-xs whitespace-nowrap">
                Designation here
              </p>
            </div>

            <p className="text-gray-700 font-medium text-sm ml-5 mt-5">
              Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit
              fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis
              in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet
              nec neque sed pellentesque viverra. Consectetur proin amet ut id
              facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu
              egestas dolor est ipsum. Malesuada etiam mi gravida praesent
              interdu
            </p>
          </div>

          <div className="w-full mt-7 bg-blue-100 rounded-lg mr-4 p-4 flex flex-row">
            <div className="flex flex-col items-center">
              <img
                src="images/img_image_209_1.png"
                alt="image209_one"
                className="w-full object-cover rounded-md"
              />
              <p className="mt-3 text-gray-800 font-medium text-sm">
                John Smith
              </p>
              <p className="text-gray-500 font-medium text-xs whitespace-nowrap">
                Designation here
              </p>
            </div>

            <p className="text-gray-700 font-medium text-sm ml-5 mt-5">
              Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit
              fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis
              in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet
              nec neque sed pellentesque viverra. Consectetur proin amet ut id
              facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu
              egestas dolor est ipsum. Malesuada etiam mi gravida praesent
              interdu
            </p>
          </div>
        </div>
      </div>

      <div className="flex mt-20">
        <div className="w-full h-[95vh] bg-white border border-gray-300 p-12 shadow-md">
          {/* You May Also Like */}
          <div className="text-2xl font-medium mb-10">You May Also Like</div>
          <Carousel trendingCoins={coins} />

          {/* Trending Coins */}

          <div className="text-2xl mt-10 font-medium mb-10">Trending Coins</div>
          <Carousel trendingCoins={coins} />
        </div>
      </div>
    </div>
  );
}

export default App;
