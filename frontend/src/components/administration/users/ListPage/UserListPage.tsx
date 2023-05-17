import { redirect, useRouteLoaderData } from "react-router-dom";
import { User } from "../Models/UserModels";
import UserList from "../List/UserList";

function UserListPage() {
  const users = useRouteLoaderData("user");

  return <UserList users={users} />;
}

export default UserListPage;



export const usersLoader = async (): Promise<User[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/auth", {
    headers: {
      Authorization: "Bearer "+token
    }
  });
  const data = await response.json();
  return data;
};

export async function deleteUser({ request }: { request: Request }) {
  const token = localStorage.getItem("token");
  const data = await request.formData();
  const id = data.get("id");

  console.log(`front probuje usunac usera ${id}`);

  const response = await fetch(`http://localhost:5000/user/delete/` + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer "+token
    }
  });
  console.log(response);
  return redirect("/administration/users");
}
