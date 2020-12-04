import React from "react";
import Routes from "./Routes";
import "./App.css";
import ArticleContextProvider from "./components/contexts/ArticleContext";
import AuthContextProvider from "./components/contexts/AuthContext";
import FashionContextProvider from "./components/contexts/FashionContext";
import Footer from "./components/templates/Footer";
function App() {
  return (
    <AuthContextProvider>
      <ArticleContextProvider>
        <FashionContextProvider>
          <div className="App">
            <Routes />
            {/* <Footer /> */}
          </div>
        </FashionContextProvider>
      </ArticleContextProvider>
    </AuthContextProvider>
  );
}

export default App;
