import React, { useState } from "react";
import ReactantSelection from "./components/ReactantSelection";
import ProductVisualization from "./components/ProductVisualization";
import ReactionExplanation from "./components/ReactionExplanation";
import "./App.css";
const App = () => {
  const [reactionDetails, setReactionDetails] = useState(null);

  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">
            Intermediate Chemical Reaction Visualizer
          </h1>
        </header>
        <div className="main-content">
          <ReactantSelection setReactionDetails={setReactionDetails} />
          <ProductVisualization reactionDetails={reactionDetails} />
          <ReactionExplanation explanation={reactionDetails?.explanation} />
        </div>

        <footer className="app-footer">
          <p>
            © 2023 Shuaib Khan. All rights reserved.
            <a
              href="https://mdshuaibkhan.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link">
              {" "}
              Visit my portfolio
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
