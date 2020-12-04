import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";

const LoginUser = () => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    try {
      const userExist = await loginUser(email, password);
      if (userExist) {
        setRedirect(!redirect);
      } else {
        console.log("no user here...");
      }
    } catch (err) {
      console.log("err ", err);
    }
  };
  if (redirect) {
    return <Redirect to="/user-dashboard" />;
  }
  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="card mx-auto p-3"
        style={{ maxWidth: "300px" }}
      >
        {/* {errorMessage} */}
        <label className="mt-1 mb-0"> Email: </label>
        <input
          type="text"
          name="username"
          placeholder="Email adress..."
          className="p-1 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="mt-3 mb-0">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="password..."
          className="p-1 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <hr />
        <button type="submit" className="btn btn-success mt-2">
          {" "}
          Login{" "}
        </button>
      </form>
    </div>
  );
};

export default LoginUser;
