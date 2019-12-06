import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import {
  CatCollector,
  CollectedCats,
  IgnoredCats
} from "features/CatCollector";
import "styles/styles.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App bg-gray-200 h-full text-black py-2 container mx-auto antialiased font-sans">
        <IgnoredCats />
        <CatCollector />
        <CollectedCats />
      </div>
    </Provider>
  );
};

export default App;
