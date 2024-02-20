import { useState } from "react";
import UserGeneralInfo from "../GeneralInfo/UserGeneralInfo";
import UserProductionSettings from "../Production/userProductionSettings";
import UserAccess from "../AccessAndRoles/userAccessAndRoles";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast,
} from "@chakra-ui/react";

import { FetchError } from "../../../workspaces/Utils/singleWorkspaceLoader";
import FetchErrorComponent from "../../../../errorHandling/FetchErrorComponent";
import { UpdateUserData } from "../../Interfaces/updateUser.interface";
import { updateUser } from "../../Utils/updateUser";
import { editUserConsolidatedData } from "../../Utils/editUserLoader";

function UsersDetailsRoot() {
  const toast = useToast();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  //handle fetching
  const routeData = useLoaderData() as editUserConsolidatedData | FetchError;
    
  if ('error' in routeData) {
    
    return <FetchErrorComponent errors={routeData.error} />;
  }
  const { user, stages } = routeData;
  // Check for errors within consolidated data
  if ('error' in user || 'error' in stages) {
    // Handle errors within consolidated data
    const errors = [
      'Error in users: ' + (user as FetchError).error,
      'Error in stages: ' + (stages as FetchError).error,
    ];
    return <FetchErrorComponent errors={errors} />;
  }

  const [userToBeEdited, setUserToBeEdited] = useState(user);
  const [tab, setTab] = useState('general');

  //handle saving changes
  const handleSave = async (data: UpdateUserData) => {
   
  try {
    const response = await updateUser(data);
    toast({
      title: "User updated",
      description: "User data has been updated",
      status: "success",
      duration: 5000,
      position: 'top',
      isClosable: true
    });
    
  } catch (err: any) {
    toast({
      title: "Error.",
      description: err.message || "Something went wrong",
      status: "error",
      position: 'top',
      duration: 5000,
      isClosable: true
    });
  }
    
  };


  return (
    <>
      
      <Tabs defaultIndex={0} onChange={(index) => setTab(['general', 'production', 'access'][index])}>
        <TabList>
          <Tab>General</Tab>
          <Tab>Production</Tab>
          <Tab>Access</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <UserGeneralInfo user={userToBeEdited} setUser={setUserToBeEdited} />
          </TabPanel>
          <TabPanel>
            <UserProductionSettings user={userToBeEdited} setUser={setUserToBeEdited} stages={stages} handleSave={handleSave}/>
          </TabPanel>
          <TabPanel>
            <UserAccess user={userToBeEdited} setUser={setUserToBeEdited}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default UsersDetailsRoot;

