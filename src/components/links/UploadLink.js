import React, { useState, useContext } from "react";
import { ArticleContext } from "../contexts/ArticleContext";
import { AuthContext } from "../contexts/AuthContext";
import nextId from "react-id-generator";
const UploadLink = () => {
  const {
    createArticle,
    errorMessage,
    uploadArticleImage,
    uploadArticle,
    userArticles,
    setUploadArticle,
  } = useContext(ArticleContext);
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("No Category");
  const [image, setImage] = useState(null);
  const saveArticle = async (e) => {
    e.preventDefault();
    // Create a new Object.
    let newArticle = {};
    if (image) {
      const imageRef = await uploadArticleImage(image);
      newArticle.image = imageRef.name;
      newArticle.linkPath = imageRef.path;
    }
    console.log("done");
    newArticle.id = `${user.email}-${userArticles.length}`;
    newArticle.post_by = user.email;
    newArticle.title = title;
    newArticle.content = content;
    newArticle.category = category;
    // Send the newArticle to ArticleContext.
    createArticle(newArticle);
    setTitle("");
    setContent("");
    setImage(null);
    setCategory(category);
    // If we have an image send it to saveImage function.
  };

  let closeUploadArticle = (
    <button
      className="btn btn-danger float-right"
      onClick={() => setUploadArticle(!uploadArticle)}
    >
      {" "}
      Close{" "}
    </button>
  );
  return (
    <div className="">
      <div className="container mx-auto">
        <h5> Upload Article </h5>
        {closeUploadArticle}
        {/* {savedArticle ? <p> Link Saved...</p> : ""} */}
        <form onSubmit={saveArticle}>
          <input
            type="text"
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <br />
          <textarea
            style={{ minHeight: "400px" }}
            className="p-1 linkInput form-control"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <button
            type="submit"
            className="btn btn-success mt-2 float-right"
            style={{ width: "200px" }}
          >
            Save
          </button>
          <div className="row   justify-content-center">
            <div className=" d-flex flex-column col-sm-3 m-4">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                onChange={(e) => {
                  setCategory(e.target.value);
                  console.log("select..");
                }}
              >
                <option value="Empty">----</option>
                <option value="travel">Travel</option>
                <option value="fashion">Fashion</option>
                <option value="cars">Cars</option>
              </select>
            </div>
            <input
              id="myFile"
              name="filename"
              type="file"
              className="m-4 col-sm-3"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </form>
        {errorMessage}
      </div>
      <hr />
    </div>
  );
};

export default UploadLink;
