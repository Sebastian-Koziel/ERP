
import useFetchData from '../../../../services/useFetch';
import { Link } from 'react-router-dom'

import './ListStages.css'

function ListStages() {
  

  const { isLoading, isError, data, errorMessage } = useFetchData('http://localhost:5000/url');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      <ul>
      {data?.map(({id, name}:any)=>{
        return <li key={id}>{name}</li>;
      })}
      </ul>
    </div>
  )
}

export default ListStages