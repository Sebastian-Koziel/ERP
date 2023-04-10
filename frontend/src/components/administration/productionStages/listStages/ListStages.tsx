import { Link } from 'react-router-dom'
import AddNewStage from '../addNewStage/AddnewStage'
import './ListStages.css'

function ListStages() {
  

  return (
    <section>
    <div>list stages</div>
    <Link to= "/adminStages/new"> Add new </Link>

    </section>
    
  )
}

export default ListStages