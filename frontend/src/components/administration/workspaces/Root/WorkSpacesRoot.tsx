import { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { hasAccessToCompanySetup } from "../../../../services/auth";
import { useToast } from "@chakra-ui/react";
import { storageGetUser } from "../../../../utils/localhostHandlers";



function WorkspaceRoot() {
  const user = storageGetUser();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasAccessToCompanySetup()) {
      toast({
        title: 'Error.',
        description: 'You do not have access to this section.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });

        navigate(user.access.defaultStartPage);
    }
  }, [navigate, toast, user.access.defaultStartPage]);

  
  if (!hasAccessToCompanySetup()) {
    return null;
  }

  return (
    <>
    
      <Outlet />
      
    </>
  );
}


export default WorkspaceRoot;