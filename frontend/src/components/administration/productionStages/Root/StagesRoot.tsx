import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { hasAccessToCompanySetup } from '../../../../services/auth';
import { storageGetUser } from '../../../../utils/localhostHandlers';
import { useToast } from '@chakra-ui/react';

function StagesRoot() {
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

export default StagesRoot;
