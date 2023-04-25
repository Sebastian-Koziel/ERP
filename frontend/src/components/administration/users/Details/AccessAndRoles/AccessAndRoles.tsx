import { useState } from 'react';
import { User } from '../../Models/UserModels';
import { useRouteLoaderData, Form, redirect } from "react-router-dom"

function UserAccess() {
 //get user info
  const user: any | User = useRouteLoaderData(`singleUserLoader`);

   //TO DO /// this has to be change to one status object - zesramy sie jak dla kazdego trzeba bedzie tak :)
  const [usersTab, setUsersTab] = useState(user.access.usersNav.general);
  const [stagesTab, setStagesTab] = useState(user.access.stages.general);
  
  const handleUserTabChange = (e:any) =>{
    setUsersTab(e.target.checked);
  }

  const handleStagesTabChange = (e:any) =>{
    setStagesTab(e.target.checked);
  }

    return (
      <>
      <Form method="patch">
      <input type="hidden" name="userId" value={user._id} />
      <input 
      type="checkbox" 
      id="accessUsersTab" 
      name="accessUsersTab" 
      onChange={handleUserTabChange}
      checked={usersTab}
      />
      users tab
      <input 
      type="checkbox" 
      id="accessStagesTab" 
      name="accessStagesTab" 
      onChange={handleStagesTabChange}
      checked={stagesTab}
      />
      stages tab

      <button type="submit">SAVE</button>
      </Form>
      
      </>
    )
  }
  
  export default UserAccess

  export async function updateAccess({request}:{request:Request}) {
    const data = await request.formData();
    const userId = data.get('userId')
    
    let usersNavGeneralAccess;
    if(data.get('accessUsersTab') === 'on') { usersNavGeneralAccess = true;} else {usersNavGeneralAccess = false}
    let stagesGeneralAccess;
    if(data.get('accessStagesTab') === 'on') { stagesGeneralAccess = true;} else {stagesGeneralAccess = false}

    const authData = {
      id: userId,
      usersNavGeneralAccess: usersNavGeneralAccess,
      stagesGeneralAccess: stagesGeneralAccess, 
    }
    
    
    
    const response = await fetch('http://localhost:5000/user/updateAccess', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authData)
    });
  
  
    return redirect("");
  }