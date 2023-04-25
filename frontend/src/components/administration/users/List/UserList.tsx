import { Link, useSubmit } from "react-router-dom";
import { User } from "../Models/UserModels";

function UserList(users: any) {
  const submit = useSubmit();

  function startDeleteHandler(id: string) {
    const proceed = window.confirm("Siur?");

    if (proceed) {
      submit({ id }, { method: "delete" });
    }
  }
  users = users.users;

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>login</th>
            <th>password</th>
            <th>role</th>
            <th>name</th>
            <th>surname</th>
            <th>show</th>
            <th>delete</th>
          </tr>

          {users.map((user: User) => (
            <tr>
              <td>{user.login}</td>
              <td>{user.password}</td>
              <td>{user.access.role}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>
                <Link to={user._id}>show</Link>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => startDeleteHandler(user._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UserList;
