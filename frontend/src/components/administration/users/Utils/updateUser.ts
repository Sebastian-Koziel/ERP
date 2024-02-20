export async function updateUser(data:any) {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/auth/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(data),
  });

  if(!response.ok) {
    throw { message: 'Something went wrong with updating user', status: 500}
  }

  return response;
}