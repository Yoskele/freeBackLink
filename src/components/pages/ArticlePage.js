import React from "react";
import ReactDOM from "react-dom";

const ArticlePage = (props) => {
  const closeWindow = () => {
    window.location.reload(false);
  };

  // Create a Div container.
  const title = React.createElement("h1", {}, props.title);
  const content = React.createElement("p", {
    dangerouslySetInnerHTML: {
      __html: props.content,
    },
  });
  const closeButton = React.createElement(
    "div",
    {
      className: "closeButtonArticle",
      onClick: () => {
        closeWindow();
      },
    },
    "X"
  );

  const container = React.createElement(
    "div",
    { className: "articlePaperContainer" },
    title,
    content,
    closeButton
  );

  ReactDOM.render(container, document.getElementById("articleContainer"));
};

export default ArticlePage;
