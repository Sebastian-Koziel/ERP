import { hasAccessToStages, hasAccessToUsers } from "../../../services/auth"
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
        }end>
          Summary
        </NavLink>
      </li>
      { hasAccessToStages() &&
        <li>
          <NavLink to="stages" 
          className={( navData) => 
            navData.isActive ? 'active' : undefined
        }
        >
          Production Stages
        </NavLink>
        </li>
      }
      { hasAccessToUsers() && 
        <li>
          <NavLink to="users" 
          className={( navData) => 
            navData.isActive ? 'active' : undefined
          }
          >
            Users
          </NavLink>
        </li>
      }
    </ul>
    </div>
    </section>
  )
}

export default AdministrationMainNav