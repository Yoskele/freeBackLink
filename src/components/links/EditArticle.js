import React, { useState, useContext, useRef } from "react";
import { ArticleContext } from "../contexts/ArticleContext";
const EditArticle = () => {
  const {
    article,
    saveChangesOnArticle,
    setEditContainer,
    editContainer,
  } = useContext(ArticleContext);
  const [message, setMessage] = useState(false);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log("article id ", article.id);
    const updateArticle = {
      id: article.id,
      title: titleRef.current.value,
      content: contentRef.current.value,
      category: article.category,
    };
    saveChangesOnArticle(updateArticle);
    setMessage(true);
  };
  let messageBox;
  if (message) {
    messageBox = (
      <div>
        <h6>Updated!</h6>
      </div>
    );
  }
  return (
    <div className="">
      <div className="container mx-auto">
        <h4>Don't forget to save.</h4>
        <button
          className="btn btn-danger float-right"
          onClick={() => setEditContainer(!editContainer)}
        >
          Close window
        </button>
        {messageBox}
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            placeholder="Title"
            ref={titleRef}
            defaultValue={article.title}
          />

          <textarea
            style={{ minHeight: "400px" }}
            className="p-1 linkInput  form-control mt-3"
            ref={contentRef}
            defaultValue={article.content}
          />
          <button
            type="submit"
            className="btn btn-success mt-2 float-right"
            style={{ width: "200px" }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditArticle;
