import React from "react";

function LogOut(props) {
  handleLogout = (event) => {
    event.preventDefault();

    fetch("/users/sign_out", {
      method: "DELETE",
      headers: new Headers({
        "X-CSRF-TOKEN": document.getElementsByName("csrf-token")[0].content,
      }),
    })
      .then((res) => console.log(res))
      .then(() => document.location.reload(true));
  };

  return (
    <a className="nav-link" onClick={handleLogout} href="/users/sign_out">
      Sign Out
    </a>
  );
}

export default LogOut;
