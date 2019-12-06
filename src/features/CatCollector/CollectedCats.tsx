import React from "react";
import { ConnectedProps } from "react-redux";
import withCatCollection from "./withCatCollection";
import CatCollection from "./CatCollection";

type ReduxProps = ConnectedProps<typeof withCatCollection>;

const CollectedCats: React.FC<ReduxProps> = ({ collectedCats }) => {
  return (
    <CatCollection cats={collectedCats}>
      <h2 className="text-2xl text-center">
        Your Kitty Collection{" "}
        <span role="img" aria-label="cat with heart eyes">
          😻
        </span>
      </h2>
    </CatCollection>
  );
};

export default withCatCollection(CollectedCats);
