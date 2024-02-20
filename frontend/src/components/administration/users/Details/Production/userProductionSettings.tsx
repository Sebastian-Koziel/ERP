import { Stage } from "../../../productionStages/interfaces/Stage.interface";
import { User } from "../../Interfaces/user.interface";
import { Box, Button, Checkbox, FormControl, FormErrorMessage, FormHelperText, FormLabel, Select, VStack } from "@chakra-ui/react";
import { mapIdsToStages} from "../../Utils/utils";
import { useEffect, useState } from "react";
import { useSelect } from "../../../../../hooks/form/use-select";
import { UpdateUserData } from "../../Interfaces/updateUser.interface";

interface userAccesProps {
  user: User
  setUser:React.Dispatch<React.SetStateAction<any>>
  stages: Stage[]
  handleSave: any
}

 const UserProductionSettings:React.FC<userAccesProps> = ({user, setUser, stages, handleSave}) => {

  const [selectedStages, setSelectedStages] = useState<string[]>(user.access.production.stagesAccess);
  const [mainStageOptions, setMainStageOptions] = useState<any[]>([]);

  useEffect(() => {
    const mappedStages = mapIdsToStages(selectedStages, stages);
    setMainStageOptions(mappedStages);
  }, [selectedStages, stages]);

  const handleCheckboxChange = (stageId: string) => {
    //if selected - unselect
    if (selectedStages.includes(stageId)) {
      setSelectedStages(selectedStages.filter((id) => id !== stageId));
    } else {
      setSelectedStages([...selectedStages, stageId]);
    }
 }

  const {
    value: enteredMainStage, 
    isValid: enteredMainStageIsValid,
    hasError: mainStageInputHasError, 
    valueChangeHandler: mainStageChangedHandler, 
    inputBlurHandler: mainStageBlurHandler,
    generateOptions: mainStageGenerateOptions,
    message: mainStageErrorMessage,
    cancelEdit: resetMainStage
  } = useSelect(mainStageOptions,[], user.access.production.mainStage);

  //handle editing
  const [editing, setEditing] = useState(false);
  const editButtonHandler = () =>{
    if(editing){
      //reset values when cancel
      setSelectedStages(user.access.production.stagesAccess);
      resetMainStage();
    }
    setEditing(!editing);
  }

  //saving
  const handleSaveButton = () => {
    let finalMainstage = enteredMainStage === '' ? selectedStages[0] : enteredMainStage;
  
    const data: UpdateUserData = {
      id: user._id,
      attr : {
        login: user.login,
        name : user.name,
        surname: user.surname,
        role: user.role,
        access: {
          ...user.access,
          production: {
              ...user.access.production,
              stagesAccess: selectedStages,
              mainStage: finalMainstage
          }
        }
      }
    }
    handleSave(data);
    setEditing(!editing)
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
      
      <FormControl>
      <FormLabel>Workspace type for this operation</FormLabel>
          <Select 
            id="mainStage"
            name="mainStage" 
            value={enteredMainStage}
            onChange={mainStageChangedHandler}
            onBlur={mainStageBlurHandler}
            placeholder="Select main stage"
            disabled={!editing}
            >
          {mainStageGenerateOptions()}   
          </Select>
          {!mainStageInputHasError? (
                <FormHelperText>
                Pick a workspace type
                </FormHelperText>
                ) : (
                <FormErrorMessage>{mainStageErrorMessage}</FormErrorMessage>
                )}      
    </FormControl>
      <Button onClick={editButtonHandler}>
        {!editing ? "Edit" : "Cancel"}
      </Button>
      {editing && (
        <Button onClick={handleSaveButton} colorScheme="purple">
          Save
        </Button>)}
      </Box>
  );


}

export default UserProductionSettings;




