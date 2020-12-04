import React, { useContext, useEffect } from "react";
import { ArticleContext } from "../contexts/ArticleContext";
const DisplayLinks = () => {
  const {
    getUserArticles,
    deleteArticle,
    EditArticle,
    userArticles,
  } = useContext(ArticleContext);
  useEffect(() => {
    getUserArticles();
  }, []);
  // Return List if we have articles..
  const articleList = userArticles.length ? (
    <div className="d-flex flex-wrap justify-content-center">
      {userArticles.map((article, index) => {
        return (
          <div
            key={index}
            className="card m-4"
            style={{ width: "18rem", height: "300px" }}
            style={{
              backgroundColor: " #ffffff",
              backgroundImage:
                " linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%)",
            }}
          >
            <img
              className="mx-auto mt-2"
              src={article.image}
              alt="No Image"
              style={{ width: "250px", height: "150px" }}
            />
            <hr />
            <div className="card-body ">
              <h5 className="card-title">{article.title}</h5>

              <button
                className="btn btn-danger m-2"
                onClick={() => deleteArticle(article)}
              >
                Delete{" "}
              </button>

              <button
                className="btn btn-primary m-2"
                onClick={() => EditArticle(article.id, article.category)}
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div>No articles here...</div>
  );
  return <div>{articleList}</div>;
};

export default DisplayLinks;
