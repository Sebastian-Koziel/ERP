import { useState } from "react";
import UserGeneralInfo from "../GeneralInfo/UserGeneralInfo";
import UserProductionSettings from "../Production/userProductionSettings";
import UserAccess from "../AccessAndRoles/userAccessAndRoles";
import { fetchUserById } from "../../Utils/fetchUserByID";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast,
} from "@chakra-ui/react";
import { editUserConsolidatedData } from "../../Utils/userDetailsLoader";
import { FetchError } from "../../../workspaces/Utils/singleWorkspaceLoader";
import FetchErrorComponent from "../../../../errorHandling/FetchErrorComponent";

function UsersDetailsRoot() {
  const toast = useToast();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  //handle fetching
  const routeData = useLoaderData() as editUserConsolidatedData | FetchError;
    
  if ('error' in routeData) {
    
    return <FetchErrorComponent errors={routeData.error} />;
  }
  const { user } = routeData;
  // Check for errors within consolidated data
  if ('error' in user) {
    // Handle errors within consolidated data
    const errors = [
      'Error in workspaceTypes: ' + (user as FetchError).error,
    ];
    return <FetchErrorComponent errors={errors} />;
  }


  const [userToBeEdited, setUserToBeEdited] = useState(user);
  const [tab, setTab] = useState('general');

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
            <UserGeneralInfo user={userToBeEdited} />
          </TabPanel>
          <TabPanel>
            <UserProductionSettings user={userToBeEdited} />
          </TabPanel>
          <TabPanel>
            <UserAccess user={userToBeEdited} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default UsersDetailsRoot;

