import * as R from "ramda";

const breedIsNotDefined = R.propSatisfies(R.equals(""), "breed_id");
const categoryIsNotDefined = R.propSatisfies(R.equals(""), "category_id");
const removeBreedIdIfNotSet = R.when(breedIsNotDefined, R.dissoc("breed_id"));
const removeCategoryIfNotSet = R.when(
  categoryIsNotDefined,
  R.dissoc("category_id")
);
export const cleanSearch = R.compose(
  removeBreedIdIfNotSet,
  removeCategoryIfNotSet
);
