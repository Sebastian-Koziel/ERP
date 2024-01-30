export async function addNewProductFetch(product:any) {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/products/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer "+ token
    },
    body: JSON.stringify(product),
  });

  if(!response.ok) {
    throw { message: 'Could not add new product', status: 500}
  }

}

