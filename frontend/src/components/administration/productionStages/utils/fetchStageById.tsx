import { Stage } from "../interfaces/Stage.interface";



export const fetchStageById = async (stage_id: string): Promise<Stage> => {
    console.log(`tryig to fetch stage`)
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/stages/" +stage_id, {
      headers: {
        Authorization: "Bearer "+token
      }
    });

    if(!response.ok) {
      throw { message: `Something went wrong with fetchin stage ${stage_id}`, status: 500}
    }

    const data = await response.json();
    return data;
  };