import React, { useState, useRef, useContext, useEffect } from "react";
import LoginUser from "../user/LoginUser";
import "./style/homePage.css";
import CreateAccount from "../createAccount/CreateAccount";
import $ from "jquery";
import partnerImage from "../../images/partnerImage.png";
import { ArticleContext } from "../contexts/ArticleContext";
import firebase from "../../Firebase";
import "firebase/storage";

import ImageOne from "../../images/imageOne.jpeg";
import ImageTwo from "../../images/imageTwo.jpeg";
import ImageThree from "../../images/imageThree.png";
import Top5LatestArticles from "../lists/Top5LatestArticles";
const HomePage = () => {
  const [displayLogin, setDisplayLogin] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const { articles } = useContext(ArticleContext);
  const [display, setDisplay] = useState("");

  let imageLength = "0px";
  if (width < 500) {
    imageLength = "300px";
  } else if (width < 800) {
    imageLength = "400px";
  } else {
    imageLength = "500px";
  }

  const containerRef = useRef(null);

  // If user change the login to create account the container will go up and down.
  const toogleWindow = () => {
    const container = containerRef;
    $(container.current).slideUp().slideDown("slow");
  };
  return (
    <div>
      <div className="headBanner p-5">
        <div className=" row mx-auto headBanner-wrapper">
          <div className="col-sm-6" style={{ color: "white" }}>
            <h5> We are offering you 3 backlinks </h5>
            <p>We have over 40 in DA, we get over 1000 user per month.</p>
            <p>
              So why wouldn't you want to link your website with our website.
            </p>
            <p>
              It has never been easier to get free backlinks you only need to
              create an account and upload your article with your anchar tag.
            </p>
            <p>
              Select the category the article will go to and just click on save
              and woala your article has been saved and is displaying on our
              website.
            </p>
          </div>
          <div className="loginInContainer col-sm-6">
            <div ref={containerRef}>
              {displayLogin ? <LoginUser /> : <CreateAccount />}
            </div>
            <p
              style={{ color: "white", cursor: "pointer" }}
              onClick={(e) => {
                toogleWindow();
                setDisplayLogin(!displayLogin);
                if (e.target.textContent === "Create Account") {
                  e.target.textContent = "Login";
                } else {
                  e.target.textContent = "Create Account";
                }
              }}
            >
              Create Account
            </p>
          </div>
        </div>
      </div>
      <div id="articleContainer"></div>
      <div className="row m-5">
        <div className="col-sm-6 p-3">
          <h4> Latest Article </h4>
          <Top5LatestArticles />
        </div>
        <div className="col-sm-6">
          <img
            src={partnerImage}
            alt=""
            className="img-fluid rounded"
            style={{
              width: `${imageLength}`,
              boxShadow: " 10px 10px 20px -10px rgba(0,0,0,.9)",
            }}
          />
        </div>
      </div>
      <div className="row justify-content-center mt-5 mb-4 w-100">
        <div className="col-sm-3  m-3 p-2" style={{ height: "250px" }}>
          <img src={ImageOne} alt="" />
          <h5 className="mt-2">Analysis your keywords</h5>
        </div>

        <div className="col-sm-3 m-3 p-2" style={{ height: "250px" }}>
          <img src={ImageTwo} alt="" />
          <h5 className="mt-2">Act on your decision</h5>
        </div>

        <div className="col-sm-3  m-3 p-2" style={{ height: "250px" }}>
          <img src={ImageThree} alt="" />
          <h5 className="mt-2">Enjoy the ride</h5>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if
//           request.time < timestamp.date(2020, 11, 19);
//     }
//   }
// }
