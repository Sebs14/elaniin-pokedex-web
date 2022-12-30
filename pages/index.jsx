import Hero from '../components/hero/Hero';
import Login from '../components/login/Login';
import Navbar from '../components/navbar/Navbar';
import React from 'react';

export default function Home() {
  return (
    <div>
      <Navbar
        colorPage="black"
        colorText="white"
        first_ref="/"
        second_ref="/"
        third_ref="/#login"
        first="Home"
        third="Log in / Sign up"
      />
      <Hero />
      <Login />
    </div>
  );
}
