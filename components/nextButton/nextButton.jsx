import React from 'react'

const nextButton = ({click, text}) => {
  return (
    <div>
      <button onClick={click}
      className="mr-10 ml-10 hover:bg-red-600  hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white shadow-xl text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">
      {text}
      </button>
    </div>
  )
}

export default nextButton