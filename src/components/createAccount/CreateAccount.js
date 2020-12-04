import React, { useState, useContext } from "react";

import firebase from "../../Firebase";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const CreateAccount = () => {
  const { loginUser, logOutUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectUser, SetRedirectUser] = useState(false);

  const createAccount = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setErrorMessage("Fields are required");
      return; // to break the function.
    }
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => SetRedirectUser(!redirectUser))
        .catch((err) => {
          setErrorMessage(err.message);
          console.log("this is error message ", err.message);
        });
      console.log("userAdded");
    } catch (error) {
      console.log(error);
    }
  };

  if (redirectUser === true) {
    console.log("redirectUser...");
    return <Redirect to="/user-dashboard" />;
  }
  return (
    <div>
      <form
        onSubmit={createAccount}
        className="card mx-auto p-3"
        style={{ width: "300px" }}
      >
        {errorMessage}
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
        <button type="submit" className="btn btn-primary mt-2">
          {" "}
          Create{" "}
        </button>
      </form>
      {/* <button onClick={() => logOutUser()}>LogOut </button> */}
    </div>
  );
};
export default CreateAccount;
