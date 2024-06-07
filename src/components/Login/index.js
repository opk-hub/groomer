import React, { useState, useContext } from "react";
import { Store } from "../../App";
import { useNavigate } from "react-router-dom";
import Context, { setToken } from "../../Context/Context";

import { ToastError, ToastWarning } from "../../Middlewares/Alertpop";

import "./index.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [, setisAuth] = useContext(Store);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;

    if (username.value === "" || password.value === "") {
      ToastWarning("Fields cannot be empty");
      return;
    }

    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    // Create the request body in JSON format
    let bodyContent = JSON.stringify({
      username: username.value,
      password: password.value,
    });

    // Send a POST request to the server for login
    let response = await fetch(`${Context}/admin/login`, {
      method: "POST",
      mode: "cors",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    let code = data.code;
    if (code === 401 || code === 404 || code === 406) {
      ToastError(data.message);
      return;
    }

    // If login is successful, navigate to the '/admin' route
    if (data.message === "Logged in successfully") {
      setToken(data.data.token);
      setisAuth(data.data.token);
      navigate("/admin-form");
    }
  };

  return (
    <div className="bg-container-log">
      <div className="bg-login">
        <div className="login">
          <h1 className="log-hed">Login</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="user">
              <label className="log-in-hed-name">Username</label>
              <input
                className="log-place"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="user">
              <label className="log-in-hed-name">Password</label>
              <input
                className="log-place"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="log-btn-div">
              <button type="submit" className="log-button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;







// import React, { useState, useContext } from "react";
// import { Store } from "../../App";
// import { useNavigate } from "react-router-dom";
// import Context, { setToken } from "../../Context/Context";

// import { ToastError, ToastWarning } from "../../Middlewares/Alertpop";

// import "./index.css";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const [, setisAuth] = useContext(Store);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { username, password } = e.target.elements;

//     if (username.value === "" || password.value === "") {
//       ToastWarning("Fields cannot be empty");
//       return;
//     }

//     let headersList = {
//       Accept: "*/*",
//       "Content-Type": "application/json",
//     };

//     // Create the request body in JSON format
//     let bodyContent = JSON.stringify({
//       username: username.value,
//       password: password.value,
//     });

//     // Send a POST request to the server for login
//     let response = await fetch(`${Context}/admin/login`, {
//       method: "POST",
//       mode: "cors",
//       body: bodyContent,
//       headers: headersList,
//     });

//     let data = await response.json();
//     let code = data.code;
//     if (code === 401 || code === 404 || code === 406) {
//       ToastError(data.message);
//       return;
//     }

//     // If login is successful, navigate to the '/admin' route
//     if (data.message === "Logged in successfully") {
//       setToken(data.data.token);
//       setisAuth(data.data.token);
//       navigate("/admin-form");
//     }
//   };

//   return (
//     <div className="bg-container-log">
//       <div className="bg-login">
//         <div className="login">
//           <h1 className="log-hed">Login</h1>
//           {error && <p className="error-message">{error}</p>}
//           <form onSubmit={handleLogin}>
//             <div className="user">
//               <label className="log-in-hed-name">Username</label>
//               <input
//                 className="log-place"
//                 type="text"
//                 name="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="user">
//               <label className="log-in-hed-name">Password</label>
//               <input
//                 className="log-place"
//                 type="password"
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="log-btn-div">
//               <button type="submit" className="log-button">
//                 Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
