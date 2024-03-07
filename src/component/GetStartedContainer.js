import React from "react";

const GetStartedContainer = ({ top3Coins }) => {
  return (
    <div>
      <div className="rounded-2xl flex flex-col h-[70vh] bg-blue-700 p-8 mb-4 flex text-center">
        <div className="text-white text-2xl font-medium text-center">
          Get Started with Koinx <br />
          <span className="inline-block">for FREE</span>
        </div>
        <div className="text-white text-sm text-center p-4 mt-4">
          <p>
            With our range of features that you can equip for free, KoinX allows
            you to be more educated and aware of your tax reports.
          </p>
        </div>
        <img
          src="images/img_frame.svg"
          alt="image_two"
          className="h-[166px] mt-6"
        />
        <div className="mt-5">
          <button className="bg-white text-black py-2 px-4 rounded-lg font-sans font-medium">
            <div className="flex flex-row">
              Get Started for FREE
              <img
                src="images/img_iconly_light_arrow_right.svg"
                alt="Iconly/Light/Arrow - Right"
                className="ml-2"
              />
            </div>
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default GetStartedContainer;

      