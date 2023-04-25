import { useRouteLoaderData } from "react-router-dom";
import "./EditStage.css";

function EditStage() {
  const data = useRouteLoaderData("stagesLoader");

  return (
    <section>
      <input type="text" defaultValue={data ? data.name : ""} />
    </section>
  );
}

export default EditStage;
