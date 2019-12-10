import React from "react";
import { CatImage } from "ts/Cat";
import CatBadge from "components/CatBadge";
import "./catCollection.css";

const CatCollection: React.FC<{ cats: CatImage[] }> = ({ cats, children }) => {
  return (
    <div>
      {children}
      <div className="collection-grid">
        {cats.map(cat => (
          <CatBadge cat={cat} key={cat.id} />
        ))}
      </div>
    </div>
  );
};

export default CatCollection;
