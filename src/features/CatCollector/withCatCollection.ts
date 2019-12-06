import { connect } from "react-redux";
import { RootState } from "store/store";
import catCollectorSlice from "./redux";

const { actions } = catCollectorSlice;
const { collectCat, ignoreCat } = actions;

const mapStateToProps = (state: RootState) => ({
  collectedCats: state.catCollector.collectedCats,
  ignoredCats: state.catCollector.ignoredCats
});

const mapDispatchToProps = {
  collectCat,
  ignoreCat
};

export default connect(mapStateToProps, mapDispatchToProps);
