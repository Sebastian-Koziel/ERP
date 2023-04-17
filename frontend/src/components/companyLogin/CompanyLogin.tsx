import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import './CompanyLogin.css'

function CompanyLogin() {

  const navigate = useNavigate();
  const inpu = useRef<HTMLInputElement>(null);

  const submitHandler = () => {
    if(inpu.current?.value === 'druk'){
      
      navigate('/production')
    } 

    if(inpu.current?.value === 'admin'){
      navigate('/administration')
    } 
    if(inpu.current?.value === 'client'){
      navigate('/client')
    }
    
  }

  return (
    <section>
   <div className='login'> 
   <div>login firmowy</div>
   <div>można się zalogować "druk", "client" albo "admin"</div>
   <input type="text" ref={inpu}></input>
   <button onClick={submitHandler}>Login</button>
   </div>
    </section>
  )
}

export default CompanyLogin