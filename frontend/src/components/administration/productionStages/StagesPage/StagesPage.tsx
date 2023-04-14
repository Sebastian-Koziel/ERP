import './StagePage.css'

function StagePage() {
  
  return (
    <div>
      LIST
      
    </div>
  )
}

export default StagePage

interface Stage {
  id: number,
  name: string
}

interface StageData {
  results: Stage[];
}

export const stagesLoader = async (): Promise<StageData> => {
  const response = await fetch ("http://localhost:5000/url");

  const data = await response.json();
  console.log(data);
  return data  ;
}