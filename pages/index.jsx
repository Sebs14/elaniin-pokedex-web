import Hero from "../components/hero/Hero";
import Login from "../components/Login/Login";
import Navbar from "../components/Navbar/Navbar";

export default function Home() {
  return (
    <div>
     <Navbar first_ref='/' second_ref='/' third_ref='/#login'  first="Home" third="Log in / Sign up"/>
     <Hero/>
     <Login/>
    </div>
  );
}
