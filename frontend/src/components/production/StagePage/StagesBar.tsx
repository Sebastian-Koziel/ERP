import { Stage } from "../../administration/productionStages/interfaces/Stage.interface";
import "./StagesBar.css";

function StagesBar(props:any) {
    const stages = props.stages;
    const userStages = props.userStages;
    const setIndex =  props.setIndex;
    const currentIndex = props.index;

    const handleStageClick = (index:number) => {
        localStorage.setItem("lastViewedStage", index.toString());
        setIndex(index);
    };

  return (
      <>
      <div>
        {userStages.map((stage:string, index:number) => (
                <p
                key={stage}
                style={{ cursor: 'pointer' }}
                onClick={() => handleStageClick(index)}
                className={index === currentIndex ? 'active' : 'inactive'}
                >
                    {stages.find((stageType:Stage) => stageType._id === stage)?.name}
                </p>
              ))}
        </div>
      </>
    );
}

export default StagesBar;