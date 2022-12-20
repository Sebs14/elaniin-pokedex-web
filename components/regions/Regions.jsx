import React from "react";
import { UserAuth } from "../../pages/UserContext";

const Regions = () => {
  const { user } = UserAuth()

  return (
    <div className=" flex items-center justify-center h-screen bg-fixed bg-center bg-cover custom-bg-charizard">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]" />
      <div className="flex flex-col z-[2]">
        <h1 className="text-6xl font-syne text-white">
          {" "}
          Welcome trainer {user?.displayName}
        </h1>
        <p className="text-3xl text-white">
          From here you can start your adventure as a pokemon trainer
        </p>
      </div>
    </div>
  );
};

export default Regions;
