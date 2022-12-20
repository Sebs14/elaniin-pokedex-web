import React , {useEffect, useState, useContext} from 'react'
import UserNavbar from '../components/userNavbar/UserNavbar'
import Regions from '../components/regions/Regions'
import { useRouter } from 'next/router'
import { UserAuth } from "./UserContext";


const menu = () => {
  const router = useRouter()
  const {user, logOut} = UserAuth()
  
  

  const handleSignOut = async () =>{
    try {
      await logOut()
      router.replace("/")
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <div>
       <UserNavbar colorPage='white' colorText='black' first_ref='/menu/#regions' second_ref='/' third_ref='/#login'  first="Regions" image={user?.photoURL} alt={user?.displayName + " photo"} name={user?.displayName } clickFour={handleSignOut}/>
       <Regions/>
       
    </div>
  )
}

export default menu