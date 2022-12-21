import React, { useState, useEffect } from "react";
import {useRouter} from "next/router";
import { CgGoogle, CgFacebook } from "react-icons/cg";
import { UserAuth } from "../../pages/UserContext";


const Login = () => {
  const [isAccount, setIsAccount] = useState(true);
  const router = useRouter()
  const {googleSignIn, facebookSignIn, user} = UserAuth()
 

  const loginGoogle = async () => {
    try {
      await googleSignIn()
      
    } catch (error) {
      console.log(error)
    }
  };
  const loginFacebook = async () => {
    try {
      await facebookSignIn()
      
    } catch (error) {
      console.log(error)
    }
    
  };
  
  const haveAccountHandler = () => {
    setIsAccount(!isAccount);
  };

  useEffect(() => {
    if(user == null){
      router.push("/")
      return
    }
      router.push("/menu")
  },[user])

  return (
    <div id="login">
      <div className="h-screen flex">
        <div
          className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center"
        >
          <div
            className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
          ></div>
          <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
            <h1 className="text-white font-bold text-4xl">Pokedex</h1>
            <p className="text-white mt-1">
              Make your own teams and discover a new world
            </p>
            <div className="flex justify-center lg:justify-start mt-6">
              
            </div>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          {isAccount ? (
            <div className="w-full px-8 md:px-32 lg:px-24">
              <form className="bg-white rounded-md shadow-2xl p-5">
                <h1 className="text-gray-800 font-bold text-2xl mb-1">
                  Hello Again! 
                </h1>
                <p className="text-sm font-normal text-gray-600 mb-8">
                  Log in with:
                </p>
                
                <div
                  type="submit"
                  onClick={loginGoogle}
                  className="w-full bg-indigo-600 mt-5 py-2 rounded-2xl flex items-center justify-center hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                >
                  <CgGoogle size={25}/>
                  <p className="pl-4">Google</p>
                </div>
                <div
                  type="submit"
                  onClick={loginFacebook}
                  className="flex items-center justify-center w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                >
                  <CgFacebook size={25}/>
                  <p className="pl-1">Facebook</p>
                </div>
                
                <div className="flex justify-between mt-4">
                  <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"></span>

                  <button
                    onClick={haveAccountHandler}
                    className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                  >
                    Don't have an account yet?
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="w-full px-8 md:px-32 lg:px-24">
              <form className="bg-white rounded-md shadow-2xl p-5">
                <h1 className="text-gray-800 font-bold text-2xl mb-1">
                  Sign in with:
                </h1>

                <button
                  type="submit"
                  className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                >
                  Sign in
                </button>
                <div className="flex justify-between mt-4">
                  <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"></span>

                  <button
                    onClick={haveAccountHandler}
                    className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                  >
                    have an account already?
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
