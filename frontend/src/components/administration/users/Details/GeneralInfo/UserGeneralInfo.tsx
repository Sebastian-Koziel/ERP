import { User } from "../../Models/UserModels";
import { useRouteLoaderData } from "react-router-dom";
import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";

function UserGeneralInfo() {
  const user: any | User = useRouteLoaderData(`singleUserLoader`);

  return (
    <Card>
      <CardHeader>
        <Heading size="sm">
          User Info : {user.name} {user.surname}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>login: {user.login}</Text>
        <Text>password: {user.password}</Text>
      </CardBody>
    </Card>
  );
}

export default UserGeneralInfo;

interface MyLoaderProps {
  userId: string;
}

export const userByIdLoader = async ({
  params,
}: {
  params: MyLoaderProps;
}): Promise<User> => {
  const userId = params.userId;
  //console.log(`front probuje wbic na usera ${userId}`)

  const response = await fetch("http://localhost:5000/user/" + userId);

  const data = await response.json();

  //console.log(data)

  return data;
};
