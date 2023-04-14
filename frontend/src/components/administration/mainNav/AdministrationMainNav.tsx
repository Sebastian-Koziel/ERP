import "./AdministrationMainNav.css"
import { NavLink } from "react-router-dom"

function AdministrationMainNav() {
  
  return (
    <section>
      <div className="nav">
        main nav
    <ul>
      <li>
        <NavLink to="" 
        className={( navData) => 
          navData.isActive ? 'active' : undefined
        
      }
      end
      >
        Summary
      </NavLink>
      </li>
      <li>
        <NavLink to="stages" 
        className={( navData) => 
          navData.isActive ? 'active' : undefined
      }
      >
        Production Stages
      </NavLink>
      </li>
    </ul>
    </div>
    </section>
  )
}

export default AdministrationMainNav