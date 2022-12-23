import React, { useState, useEffect } from "react";
import List from "../list/List";
import Link from "next/link"
import Pikachu from "../../assets/pikachu.json"
import Lottie from "lottie-react";
import Squirtle from "../../assets/squirtle.json"
import { db } from "../../config/firebase";
import { get, ref, remove, set } from "firebase/database";
import { auth } from "../../config/firebase";
import { useRouter } from "next/router";
import EditTeam from "../editTeam/editTeam"

const TeamTable = () => {
  const router = useRouter();
  const dbRef = ref(db, "teams")
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false)
  const [editTeam, setEditTeam] = useState()
  
  const handleEdit = async (team) => {
    setIsEditing(true)
    setEditTeam(team)
  }
  

  const handleDelete = async (id) => {
    
    const refTeamById = ref(db, "teams/" + id) 

    remove(refTeamById)
    setTimeout(() => {
      router.reload()
    }, 500)
  }
  
  useEffect(() => {
    setIsLoading(true);
    get(dbRef).then((snapshot) =>{
      if(snapshot.exists()) {
        const mappedTeams = Object.entries(snapshot.val()).filter(([key, value]) => value.owner == auth.currentUser.uid).map(
          ([key, value]) => ({
            id:key,
            ...value,
          })
          )
          setTeams(mappedTeams)
        }
        setIsLoading(false);
      } ).catch((e) => {
        setIsLoading(false)
        console.log("hola", e);
    })
  }, []);

  return (
    <div>
      <div className="flex justify-center h-screen w-full">
          {isLoading
            ? (<div className="flex flex-col h-screen justify-center items-center">
                <Lottie animationData={Pikachu} />
              </div>)
            : teams.length > 0
            ? <div className="grid grid-cols-1 lg:grid-cols-3">
              {teams.map((team) => (
                <div key={team.id} className=" mx-4 mt-24 w-full">
                  <List onEdit={() => handleEdit(team)} onDelete={() => handleDelete(team.id)} team={team} />
                </div>
              ))}
            </div>
            : 
            <div className="flex flex-col h-[75vh] justify-center items-center">
              <Link href={"/menu"}>
                <Lottie animationData={Squirtle} className="h-96"/>
              </Link>
              <h1 className="text-center font-bold text-3xl font-sourceSans">It seems that there is no team yet</h1>
              <p className=" font-bold font-sourceSans text-xl" >go create one now, just click me!</p>
            </div>
          }
      </div>
      {!isEditing ? null :  
        <EditTeam teamEdit={editTeam} onEdit={setEditTeam} />
      }
    </div>
    
  );
};

export default TeamTable;
