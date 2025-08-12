import style from "../style";
import { shopify, logoText } from "../assets";

const Footer = () => (
  <section className={`${style.flexCenter} ${style.paddingY} flex-col`}>
    <div className={`${style.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-3 justify-start mr-10 xs:mx-auto">
          {/* <img
            src={logoText}
            alt="hoobank"
            className="w-[266px] h-[72.14px] object-cover rounded-lg"
          />
          <p className={`${style.paragraph} mt-4 max-w-[312px]`}>
            Connect - Engage - Grow
          </p> */}
          <a
            href="https://apps.shopify.com/sendperplane"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:cursor-pointer"
          >
            <img
              src={shopify}
              className="w-80 h-auto"
              alt="Available on Shopify App Store"
            />
          </a>
        </div>
      </div>

      <div className="flex-[1.5] w-full flex flex-row justify-end flex-wrap md:mt-0 mt-10">
        <div className="flex flex-col ss:my-0 my-4 min-w-[150px]">
          <h2 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
            Contact
          </h2>
          <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer">
            Mobile: +45 52 52 99 24
          </p>
          <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer">
            Email: support@sendperplane.com
          </p>
        </div>
      </div>
    </div>

    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
        Copyright Ⓒ 2025 Sendperplane. All Rights Reserved.
      </p>

      {/* <div className="flex flex-row md:mt-0 mt-6">
      {socialMedia.map((social, index) => (
        <img
          key={social.id}
          src={social.icon}
          alt={social.id}
          className={`w-[21px] h-[21px] object-contain cursor-pointer ${
            index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
          }`}
          onClick={() => window.open(social.link)}
        />
      ))}
    </div> */}
    </div>
  </section>
);

export default Footer;
