import { useEffect, useState } from "react";
import { fetchAllStages } from "../../../productionStages/utils/fetchAllStages";
import { Stage } from "../../../productionStages/interfaces/Stage.interface";
import { User } from "../../Interfaces/user.interface";
import { UpdateUserStagesAccess } from "../../Interfaces/updateStagesAccess";
import { updateUser } from "../../Utils/postUpdateOnUser";
import { Select } from "@chakra-ui/react";
import { moveIdTo0Index } from "../../Utils/utils";

/* TO DO
update local storage after submit with user so you dont have to logout for some components to change


*/

 const UserProductionSettings = (props:any) => {

  const [user, setUser] = useState<User>(props.user)
  //fetched stages from DB
  const [stages, setStages] = useState<Stage[]>([]);
  
  useEffect(()=>{
    const fetchData = async() => {
      try {
      const fetchedStages = await fetchAllStages()
      
      setStages(fetchedStages);
      
      }catch(err){
        return err
      }
    }
    fetchData();

    if (user.access.production.stagesAccess.length > 0) {
      setMainStage(user.access.production.stagesAccess[0]);
    }

  }, []);

  const [selectedStages, setSelectedStages] = useState<string[]>(user.access.production.stagesAccess);
  const [mainStage, setMainStage] = useState<string>('');


  const handleCheckboxChange = (stageId: string) => {
    
      if (selectedStages.includes(stageId)) {
        setSelectedStages(selectedStages.filter((id) => id !== stageId));
      } else {
        setSelectedStages([...selectedStages, stageId]);
      }
    
  };

  const handleMainStageSelect = (stageId: string) => {
    
      setMainStage(stageId);
    
  };

  //handle editing
  const [editing, setEditing] = useState(false);
  const editButtonHandler = () =>{
    if(editing){
      //reset values when cancel
      setSelectedStages(user.access.production.stagesAccess);
      setMainStage('');
      if (user.access.production.stagesAccess.length > 0) {
        setMainStage(user.access.production.stagesAccess[0]);
      }
    }
    setEditing(!editing);
  }

  //submitting changes
  const submitFormHandler = async () => {
    //move mainStage id to first index in stages array
    const newList = moveIdTo0Index(mainStage, selectedStages);
    const data: UpdateUserStagesAccess = {
      id: user._id,
      attr: {
        access:{
          ...user.access, 
          production:{
            ...user.access.production,
            stagesAccess: newList
          }
        }
      }
    }
    try {
      const response = await updateUser(data);
      //fix state with out fetching
      setUser({...user, ...data.attr.access});
      
    } catch (err) {
      return err;
    }
    setEditing(!editing);
  }

return (
    <div>
      <h2>Select Stages</h2>
      
        {stages.map((stage) => (
          <li key={stage._id}>
            <input
              type="checkbox"
              id={stage._id}
              value={stage._id}
              checked={selectedStages.includes(stage._id)}
              onChange={() => handleCheckboxChange(stage._id)}
              disabled={!editing}
            />
            <label htmlFor={stage._id}>{stage.name}</label>
          </li>
        ))}
      
      <div>
        <h2>Select Main Stage (if you don`t select it will pick first one)</h2>
        <Select 
        value={mainStage} 
        onChange={(e) => handleMainStageSelect(e.target.value)}
        isDisabled={!editing}
        >
        <option value="">main stage</option>
          {selectedStages.map((stageId) => (
            <option key={stageId} value={stageId}>
              {stages.find((stage) => stage._id === stageId)?.name}
            </option>
          ))}
        </Select>
      </div>
      <button onClick={editButtonHandler}>{!editing? 'Edit' : 'cancel' }</button>
            {editing && (<button  onClick={submitFormHandler}>save</button>)}
    </div>
  );


}

export default UserProductionSettings;




