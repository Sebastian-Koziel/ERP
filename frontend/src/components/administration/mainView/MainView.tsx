import './MainView.css'
import { Link } from 'react-router-dom'


function MainView() {
  

  return (
    <section>
    <div>main view</div>
    <Link to="/adminStages" >Stages</Link>
    </section>
  )
}

export default MainView