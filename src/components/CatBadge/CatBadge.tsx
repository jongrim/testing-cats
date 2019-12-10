import React from "react";
import { CatImage } from "ts/Cat";

const CatBadge = ({ cat }: { cat: CatImage }) => (
  <div>
    <img
      className="rounded-full w-12 lg:w-20 h-12 lg:h-20 object-cover shadow-lg"
      src={cat.url}
      alt={`precious kitten - ${cat.id}`}
    />
  </div>
);

export default CatBadge;
