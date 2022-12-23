import React, { useEffect, useState } from "react";
import UserNavbar from "../components/userNavbar/UserNavbar";
import { useRouter } from "next/router";
import { UserAuth } from "../context/UserContext";
import TeamTable from "../components/teamTable/TeamTable";
import EditTeam from "../components/editTeam/editTeam";

const teams = () => {
  const { user, logOut } = UserAuth();
  const router = useRouter();

  //signOut user from firebase
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  //security (no user) => go to main
  if (!user) {
    router.replace("/");
  }

  return (
    <div>
      <UserNavbar
        colorPage="white"
        colorText="black"
        first_ref="/menu/#regions"
        second_ref="/teams"
        third_ref="/#login"
        first="Regions"
        second="Teams"
        image={user?.photoURL}
        alt={user?.displayName + " photo"}
        clickFour={handleSignOut}
      />
      <TeamTable />
    </div>
  );
};

export default teams;
