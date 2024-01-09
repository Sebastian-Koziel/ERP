
import UserDetailsNav from "../DetailsNav/DetailsNav";
import { useState } from "react";
import UserGeneralInfo from "../GeneralInfo/UserGeneralInfo";
import UserProductionSettings from "../Production/userProductionSettings";
import UserAccess from "../AccessAndRoles/userAccessAndRoles";
import { fetchUserById } from "../../Utils/fetchUserByID";
import { useLoaderData } from "react-router-dom";



function UsersDetailsRoot() {

  const user = useLoaderData();

  const selectTab = (tab:string) => {
    
    if(tab === 'general'){
    return <UserGeneralInfo user={user}/>
    }
    if(tab === 'production'){
      return <UserProductionSettings user={user}/>
      }
    if(tab === 'access'){
        return <UserAccess user={user}/>
        }
  }
  

  const [tab, setTab] = useState('general');

  return (
    <>
      <UserDetailsNav setTab={setTab}/>
     
      {selectTab(tab)}
    </>
  );
}

export default UsersDetailsRoot;

export const userByIdLoader = async ({params,}: {params: any;}) => {
  
  try {
    const fetchedData = await fetchUserById(params.userId);
    return fetchedData;

  } catch (err) {
    return err;
  }
   
}