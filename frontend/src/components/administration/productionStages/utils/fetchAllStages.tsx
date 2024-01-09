import { Stage } from "../interfaces/Stage.interface";


export const fetchAllStages = async (): Promise<Stage[]> => {
   
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/stages", {
      headers: {
        Authorization: "Bearer "+token
      }
    });

    if(!response.ok) {
      throw { message: 'Something went wrong with fetchin stages', status: 500}
    }

    const data = await response.json();
    return data;
  };