import React, { useContext, useEffect } from "react";
import UploadLinkContainer from "../links/UploadLink";
import DisplayLinks from "../links/DisplayLinks";
import EditArticle from "../links/EditArticle";
import LoginUser from "../user/LoginUser";
import HomePage from "../pages/HomePage";
import { ArticleContext } from "../contexts/ArticleContext";
import { AuthContext } from "../contexts/AuthContext";

const UserDashboard = (props) => {
  const {
    getUserArticles,
    uploadArticle,
    setUploadArticle,
    editContainer,
  } = useContext(ArticleContext);
  useEffect(() => {
    getUserArticles();
  }, []);
  const { user, userState, logOutUser } = useContext(AuthContext);

  let buttonContainer = (
    <div className=" row justify-content-center">
      <button
        className="btn btn-success m-3 col-sm-6"
        onClick={() => setUploadArticle(!uploadArticle)}
      >
        Upload article
      </button>

      <button className="btn btn-danger m-3 col-sm-6" onClick={logOutUser}>
        {" "}
        Log out{" "}
      </button>
    </div>
  );

  const dashboard = (
    <div>
      <div className="headBanner p-5">
        <div className="mx-auto headBanner-wrapper" style={{ color: "white" }}>
          <h1> User Dashboard </h1>
          <br />
          <p> Welcome User: {user.email}</p>
          {buttonContainer}
        </div>
      </div>

      {uploadArticle ? <UploadLinkContainer /> : null}
      {editContainer ? <EditArticle /> : null}
      <DisplayLinks />
    </div>
  );
  return <div>{userState ? dashboard : <div>Loading...</div>}</div>;
};

export default UserDashboard;
