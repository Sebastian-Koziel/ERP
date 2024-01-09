import { redirect, useLoaderData } from "react-router-dom";
import UserList from "../List/UserList";
import { User } from "../Interfaces/user.interface";

function UserListPage() {
  const users = useLoaderData()
  console.log(users)
  return <UserList users={users} />;
}

export default UserListPage;


