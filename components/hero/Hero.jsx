import React from 'react'
import Lottie from "lottie-react";
import Pokeball from "../../assets/pokeball.json"

const Hero = () => {
  return (
    <div className=' flex items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img'>
      <Lottie animationData={Pokeball} loop={false} className="mr-5 z-[3] h-20"/>
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]'/>
      <div className='flex flex-col z-[2]'>
        <h1  className='text-6xl font-syne text-white '> Welcome to your pokedex of trust</h1>
        <p className='text-3xl text-white'>Here you can start your adventure all over the pokemon universe!</p>
      </div>
    </div>
  )
}

export default Hero