import { Link } from "react-router-dom";
import "./ListStages.css";

function ListStages(stages: any) {
  stages = stages.stages;
  return (
    <div>
      All Events
      <ul>
        {stages.map((stage: any) => (
          <li key={stage.id}>
            <Link to={stage.id.toString()}>
              <div>{stage.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListStages;
