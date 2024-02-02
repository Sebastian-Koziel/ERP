import { useEffect, useState } from "react";
import { fetchAllStages } from "../../../productionStages/utils/fetchAllStages";
import { Stage } from "../../../productionStages/interfaces/Stage.interface";
import { User } from "../../Interfaces/user.interface";
import { UpdateUserStagesAccess } from "../../Interfaces/updateStagesAccess";
import { updateUser } from "../../Utils/postUpdateOnUser";
import { Box, Button, Checkbox, FormControl, FormLabel, Select, VStack } from "@chakra-ui/react";
import { moveIdTo0Index } from "../../Utils/utils";

interface userAccesProps {
  user: User
  setUser:React.Dispatch<React.SetStateAction<any>>
  stages: Stage[]
}

 const UserProductionSettings:React.FC<userAccesProps> = ({user, setUser, stages}) => {

  //const [user, setUser] = useState<User>(props.user)
  //fetched stages from DB
  //const [stages, setStages] = useState<Stage[]>([]);
  stages = []
  useEffect(()=>{
    const fetchData = async() => {
      try {
      const fetchedStages = await fetchAllStages()
      
      //setStages(fetchedStages);
      
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
    <Box>
      
      <FormControl>
        <FormLabel>Select Stages</FormLabel>
        <VStack align="flex-start">
          {stages.map((stage) => (
            <Box key={stage._id}>
              <Checkbox
                id={stage._id}
                isChecked={selectedStages.includes(stage._id)}
                onChange={() => handleCheckboxChange(stage._id)}
                isDisabled={!editing}
              >
                {stage.name}
              </Checkbox>
            </Box>
          ))}
        </VStack>
      </FormControl>
      
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
      <Button onClick={editButtonHandler}>
        {!editing ? "Edit" : "Cancel"}
      </Button>
      {editing && (
        <Button onClick={submitFormHandler} colorScheme="purple">
          Save
        </Button>)}
      </Box>
  );


}

export default UserProductionSettings;




