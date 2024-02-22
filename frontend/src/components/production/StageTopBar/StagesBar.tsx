import { Button, Flex } from "@chakra-ui/react";
import { Stage } from "../../administration/productionStages/interfaces/Stage.interface";

interface StagesBarProps {
  setCurrentStageId: (stageId: string) => void;
  userStages: string[]
  stages: Stage[]
}

const StagesBar: React.FC<StagesBarProps> = ({setCurrentStageId, userStages, stages}) => {
    
    const handleStageClick = (stageId: string) => {
      setCurrentStageId(stageId);
    };

  return (
    <Flex>
    {userStages.map((userStageId: string) => {
      const stage = stages.find((stageType: Stage) => stageType._id === userStageId);
      return (
        <Button
          margin={'10px'}
          key={userStageId}
          onClick={() => handleStageClick(userStageId)}
          variant="outline"
          colorScheme="blue"
          mx={2}
        >
          {stage?.name}
        </Button>
      );
    })}
  </Flex>
    );
}

export default StagesBar;