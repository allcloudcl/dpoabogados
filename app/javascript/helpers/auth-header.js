export function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.authentication_token) {
    return {
      "X-User-Token": user.authentication_token,
      "X-User-Email": user.email,
    };
  } else {
    return {};
  }
}
