import React, { useState } from "react";
import styles from "./style";
import { Navbar, Business, Footer } from "./components";
import { tablet } from "./assets";
import { heroImage2, secondHero } from "./assets";
import ButtonTypeUser from "./components/ButtonTypeUser";
import Carousel from "./components/Carousel";
import retailImages from "./assets/retail/index.js"; // Adjust the path according to your folder structure
import individualImages from "./assets/individual/index.js";
const App = () => {
  const [userType, setUserType] = useState("");
  const [images, setImages] = useState([]);
  const handleUserTypeSelect = (type) => {
    setUserType(type);
    if (type === "retail") {
      setImages(retailImages);
    } else if (type === "individual") {
      setImages(individualImages);
    }
    console.log(`Selected user type: ${type}`);
  };
  return (
    <div className="bg-ngrokDark w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-ngrokDark ${styles.flexStart} relative overflow-hidden`}>
        <div className="absolute z-[0] w-[60%] h-[60%] rounded-full bg-ngrokBlue opacity-20 blur-[120px] -top-20 -left-20" />
        {/* <div className="absolute z-[0] w-[50%] h-[50%] rounded-full bg-lightBlue opacity-20 blur-[120px] bottom-0 right-0" /> */}
        <div className={`relative z-[1]`}>
          <div className="w-full relative">
            <img
              src={heroImage2}
              alt="Sendperplane dashboard on a laptop"
              className="w-full h-auto relative z-[5] rounded-2xl shadow-2xl"
            />
            <a
              href="https://spplane.app/register"
              target="_blank"
              rel="noreferrer"
              className="absolute z-[10] left-[4%] sm:left-[6%] top-[72%] xs:top-[74%] px-5 sm:px-8 py-2.5 sm:py-4 rounded-lg bg-ngrokBlue font-poppins font-medium text-white text-[13px] sm:text-[18px] hover:opacity-90 transition-opacity shadow-lg"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          {/* <Stats /> */}
          <Business />
          <div className="w-full relative" id="product">
            <img
              src={secondHero}
              alt="Build your content, express your product"
              className="w-full h-auto relative z-[5] rounded-2xl shadow-2xl"
            />
            <a
              href="https://spplane.app/register"
              target="_blank"
              rel="noreferrer"
              className="absolute z-[10] right-[3%] sm:right-[4%] top-[68%] xs:top-[70%] px-5 sm:px-8 py-2.5 sm:py-4 rounded-lg bg-ngrokBlue font-poppins font-medium text-white text-[13px] sm:text-[18px] hover:opacity-90 transition-opacity shadow-lg"
            >
              Try it out
            </a>
          </div>
          {/* <Billing />
        <CardDeal />
        <Testimonials />
        <Client />
        <CTA /> */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
