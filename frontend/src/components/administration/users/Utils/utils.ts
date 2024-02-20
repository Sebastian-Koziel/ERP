import { Stage } from "../../productionStages/interfaces/Stage.interface";

export const mapIdsToStages = (stageIds:string[], allStages:Stage[]) => {
  return stageIds.map(stageId => {
      const stage = allStages.find(stage => stage._id === stageId);
      if (stage) {
          return { _id: stage._id, name: stage.name };
      }
      return null; // Handle the case where the stage ID doesn't match any stage
  }).filter(stage => stage !== null); // Remove null values if any
};