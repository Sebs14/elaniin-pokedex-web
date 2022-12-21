import React from 'react'

const prevButton = ({click}) => {
  return (
    <div>
      <button onClick={click}
      className="ml-10 hover:bg-red-600  hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white shadow-xl text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">
        previous
      </button>
    </div>
  )
}

export default prevButton