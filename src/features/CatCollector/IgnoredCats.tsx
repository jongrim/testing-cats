import React from "react";
import { ConnectedProps } from "react-redux";
import withCatCollection from "./withCatCollection";
import CatCollection from "./CatCollection";

type ReduxProps = ConnectedProps<typeof withCatCollection>;

const IgnoredCats: React.FC<ReduxProps> = ({ ignoredCats }) => {
  return (
    <CatCollection cats={ignoredCats}>
      <h2 className="text-2xl text-center">
        Still in the running{" "}
        <span role="img" aria-label="running person">
          🏃‍♀️
        </span>
      </h2>
    </CatCollection>
  );
};

export default withCatCollection(IgnoredCats);
