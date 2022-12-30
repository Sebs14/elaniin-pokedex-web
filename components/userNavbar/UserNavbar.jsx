import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { IoLogOut } from 'react-icons/io5';
import Lottie from 'lottie-react';
import Pokeball from '../../assets/pokeball.json';

const UserNavbar = ({
  colorPage,
  colorText,
  first,
  second,
  third,
  first_ref,
  second_ref,
  third_ref,
  image,
  alt,
  clickFour,
}) => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState('transparent');

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor(colorPage);
      } else {
        setColor('transparent');
      }
    };
    window.addEventListener('scroll', changeColor);
  }, []);

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="fixed left-0 top-0 w-full z-10 ease-in duration-300"
    >
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-4">
        <Link
          style={{ color: `${colorText}` }}
          href="/"
          className="flex text-4xl justify-center items-center space-x-3"
        >
          <h1 className="font-bold flex">Pokedex</h1>
          <Lottie animationData={Pokeball} loop={false} className="h-10" />
        </Link>
        <ul className="hidden sm:flex md:items-center ">
          <li style={{ color: `${colorText}` }} className="p-4">
            <Link href={first_ref} className="hover:text-red-300 font-bold">
              {first}
            </Link>
          </li>
          <li style={{ color: `${colorText}` }} className="p-4">
            <Link href={second_ref} className="hover:text-red-300 font-bold">
              {second}
            </Link>
          </li>
          <li style={{ color: `${colorText}` }} className="p-4 ">
            <a href={third_ref} className="hover:text-red-300 font-bold">
              {third}
            </a>
          </li>
          <div className="flex items-center space-x-2">
            <img src={image} className="h-10 rounded-full" alt={alt} />
          </div>
          <li style={{ color: `${colorText}` }} className="p-4 ">
            <div
              onClick={clickFour}
              className="flex justify-center items-center hover:text-red-300 space-x-2"
            >
              <IoLogOut size={25} />
            </div>
          </li>
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="sm:block sm:hidden z-10">
          {nav ? (
            <AiOutlineClose size={20} style={{ color: `white` }} />
          ) : (
            <AiOutlineMenu size={20} style={{ color: `${colorText}` }} />
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={
            nav
              ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-white text-center ease-in duration-300'
              : 'sm:hidden absolute top-0 left-[200%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-white text-center ease-in duration-300'
          }
        >
          <ul>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/">Home</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/#aboutme">About me</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/#work">Skills</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
