import StageData from "../types/adminStage.type"
import { useState, useEffect } from "react";



type StagesRes = {
  data: StageData[];
}

function stagesFetchAll() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(()=>{
  setLoading(true);
  
});

}