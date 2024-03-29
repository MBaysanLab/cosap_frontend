const getApiKey = (email, password) => {
  const request_options = {
    method: "GET",
    body: "",
    redirect: "follow",
  };
  fetch(
    `https://api.genoox.com/v1/auth/login?email=${email}&password=${password}`,
    request_options
  )
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
};
