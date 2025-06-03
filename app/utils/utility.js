export function isAdmin(){
    const storedItems = JSON.parse(localStorage.getItem('userSession')) || {};
    if(storedItems !=undefined && storedItems.role!=undefined && storedItems.role =='Admin'){
        return true;
      }
      else false;
}

export function isUser(){
    const storedItems = JSON.parse(localStorage.getItem('userSession')) || {};
    if(storedItems !=undefined && storedItems.role!=undefined && storedItems.role =='Customer'){
      return true;
    }
    else false;
}

// Dummy function that fetches a new token
async function refreshSessionToken() {
  const storedItems = JSON.parse(localStorage.getItem('userSession')) || {};
  console.log("storedItems>>",storedItems)
  let refrestToken = {
    "refreshToken": storedItems.refreshToken//"yq4ANUg62BF97kxZ1o8eSF0aMcCXLeBLLKcHYk4GZ6Jy7XtjHrTE8blHni/itf7tDkvvsWSuIbMyMmTiKUxVFg=="
  }
  // let refrestToken = {
  //   "refreshToken": "VJpEvbiN9Lq7f0tE9EaM0YXT3smq7YZDuHIiIzDk8QpceSV0KHT/xtad4AMgqhwdcs4D1sHnSfOxnG8yePQSUw=="
  // }
  const res = await fetch("https://cbd-dev-api-axada2b4hpbwhsh9.centralindia-01.azurewebsites.net/api/Auth/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(refrestToken),
  });

  if (!res.ok) return null;
  const jsonResponse = await res.json();
  console.log("REfresed token >>",jsonResponse);
  jsonResponse.data.role = jsonResponse.data.roles[0];
  localStorage.setItem("userSession", JSON.stringify(jsonResponse.data));
  return jsonResponse.data;
}

// Call the main function


 export async function fetchWithAutoRetry(url, options = {}) {
  let response = await fetch(url, options);

  console.log("Main API call",response);
  if (response.status === 401) {
    // Assume refreshSessionToken is a function that calls the 
    // and returns the new token (as a string)
    const newToken = await refreshSessionToken();

    console.log("newToken >>>",newToken);
    if (!newToken) {
      throw new Error("Failed to refresh token");
    }

    // Update the Authorization header with the new token
    const updatedOptions = {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${newToken.token}`,
      },
    };

    // Retry the original request with the new token
    response = await fetch(url, updatedOptions);
  }

  return response;
}



// fetchWithAutoRetry(
//   'https://cbd-dev-api-axada2b4hpbwhsh9.centralindia-01.azurewebsites.net/api/user/profile',
//   {
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer ARRAffinity=92ca53ad8db4fbb93d4d3b7d8ab54dcf8ffecb2d731f25b0e91ad575d7534c3f; ARRAffinitySameSite=92ca53ad8db4fbb93d4d3b7d8ab54dcf8ffecb2d731f25b0e91ad575d7534c3f'
//     }
//   }
// )
// .then(async res => {
//   const data = await res.json();
//   console.log(data);
// })
// .catch(err => {
//   console.error('API call failed:', err);
// });

