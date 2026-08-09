import React, { useState } from "react";
import { close, menu } from "../assets";
import { navLinks } from "../constants";
const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar relative">
      <div className="flex items-center">
        <img
          src="/icon_transparent.png"
          alt="Sendperplane"
          className="w-[56px] h-[56px] object-contain"
        />
        <span className="font-poppins font-bold text-white text-[20px] ml-2">
          Sendperplane
        </span>
      </div>

      <a
        target="_blank"
        href="https://tally.so/r/GxVMM2"
        className="hidden sm:inline-flex absolute left-1/2 -translate-x-1/2 items-center px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm font-poppins font-medium text-white text-[14px] hover:bg-white/20 transition-colors"
      >
        Start a Free Trial ?
      </a>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-semibold cursor-pointer text-[16px] text-white ${
              index === navLinks.length - 1 ? "mr-0" : "mr-10"
            }`}
            onClick={() => setActive(nav.title)}
          >
            <a
              href={
                nav.id === "shopify"
                  ? "https://apps.shopify.com/sendperplane"
                  : `#${nav.id}`
              }
              target={nav.id === "shopify" ? "_blank" : "_self"}
              rel={nav.id === "shopify" ? "noopener noreferrer" : ""}
            >
              {nav.title}
            </a>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-semibold cursor-pointer text-[16px] text-white ${
                  index === navLinks.length - 1 ? "mb-0" : "mb-4"
                }`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
