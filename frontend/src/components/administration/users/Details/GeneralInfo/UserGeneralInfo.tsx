import { User } from "../../Models/UserModels";
import { useRouteLoaderData } from "react-router-dom";

function UserGeneralInfo() {
  const user: any | User = useRouteLoaderData(`singleUserLoader`);

  return (
    <>
      {/* <span>Name: {user.name}</span>
    <span>Surname: {user.surname}</span> */}
      <span>login: {user.login}</span>
      <span>password: {user.password}</span>
    </>
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
