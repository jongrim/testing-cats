import React from "react";
import CatCollector from "features/CatCollector";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <div>Dislikes</div>
      <CatCollector />
      <div>Likes</div>
    </div>
  );
};

export default App;
