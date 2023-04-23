import { NavLink } from "react-router-dom"
function UserDetailsNav() {
  

  return (
    <>
       <ul>
      <li>
        <NavLink to="" 
        className={( navData) => 
          navData.isActive ? 'active' : undefined
        
      }
      end
      >
        General information
      </NavLink>
      </li>
      <li>
        <NavLink to="access" 
        className={( navData) => 
          navData.isActive ? 'active' : undefined
      }
      >
        Role and access
      </NavLink>
      </li>
      
    </ul>
        
    </>
  )
}

export default UserDetailsNav