import React, { useEffect, useReducer } from "react";
import { useDispatch, ConnectedProps } from "react-redux";
import * as R from "ramda";
import { CatImage } from "ts/Cat";
import { getCatImages, QueryParams } from "./api/cats";
import { favoriteCat } from "./redux";
import withCatCollection from "./withCatCollection";
import CatCollectorSearch from "./CatCollectorSearch";
import "./catCollector.css";

enum CatCollectorStates {
  FETCHING = "FETCHING",
  LOADED = "LOADED"
}

interface CatCollectorState {
  state: CatCollectorStates;
  cat?: CatImage;
  page: number;
  query: QueryParams;
}

interface CatCollectorFetchingState extends CatCollectorState {
  state: CatCollectorStates.FETCHING;
}

interface CatCollectorLoadedState extends CatCollectorState {
  state: CatCollectorStates.LOADED;
  cat: CatImage;
}

enum ActionTypes {
  FETCH = "FETCH",
  LOAD = "LOAD"
}

interface Action {
  payload: object;
}

interface FetchCatAction extends Action {
  type: ActionTypes.FETCH;
  payload: {
    page: number;
    query?: QueryParams;
  };
}

interface LoadCatAction extends Action {
  type: ActionTypes.LOAD;
  payload: {
    cat: CatImage;
  };
}

interface CatCollectorHandlers {
  [ActionTypes.FETCH]: (
    state: CatCollectorState,
    action: FetchCatAction
  ) => CatCollectorFetchingState;
  [ActionTypes.LOAD]: (
    state: CatCollectorState,
    action: LoadCatAction
  ) => CatCollectorLoadedState;
}

function catCollectorReducer(
  state: CatCollectorState,
  action: FetchCatAction | LoadCatAction
): CatCollectorState {
  const handlers: CatCollectorHandlers = {
    FETCH: (
      state: CatCollectorState,
      action: FetchCatAction
    ): CatCollectorFetchingState => {
      return {
        state: CatCollectorStates.FETCHING,
        page: action.payload.page,
        query: action.payload.query || state.query
      };
    },
    LOAD: (
      state: CatCollectorState,
      action: LoadCatAction
    ): CatCollectorLoadedState => {
      return {
        state: CatCollectorStates.LOADED,
        cat: action.payload.cat,
        page: state.page,
        query: state.query
      };
    }
  };

  switch (action.type) {
    case "FETCH":
      return handlers.FETCH(state, action);
    case "LOAD":
      return handlers.LOAD(state, action);
    default:
      return state;
  }
}

const initialState: CatCollectorState = {
  state: CatCollectorStates.FETCHING,
  page: 0,
  query: {}
};

type ReduxProps = ConnectedProps<typeof withCatCollection>;

const CatCollector: React.FC<ReduxProps> = ({ collectCat, ignoreCat }) => {
  const reduxDispatch = useDispatch();
  const [state, dispatch] = useReducer(catCollectorReducer, initialState);
  const [searchFormVisible, setSearchFormVisible] = React.useState(false);

  const getNextCat = () => {
    dispatch({
      type: ActionTypes.FETCH,
      payload: { page: state.page + 1 }
    });
  };

  const searchCats = (query: QueryParams) => {
    dispatch({
      type: ActionTypes.FETCH,
      payload: {
        page: initialState.page,
        query
      }
    });
  };

  const handleIgnoreCat = R.compose(getNextCat, ignoreCat);
  const handleCollectCat = R.compose(getNextCat, collectCat);

  useEffect(() => {
    const effects = {
      FETCH: () =>
        getCatImages({ page: state.page, queryParams: state.query }).then(
          ({ data }) => {
            const firstCat = data[0];
            dispatch({ type: ActionTypes.LOAD, payload: { cat: firstCat } });
          }
        )
    };
    if (state.state === "FETCHING") {
      effects.FETCH();
    }
  }, [state]);

  return (
    <div className="flex flex-col">
      <div className="bg-gray-400 relative pb-2/3 shadow">
        {state.state === CatCollectorStates.LOADED && (
          <img
            className="rounded rounded-b-none absolute top-0 h-full w-full object-cover"
            src={state.cat?.url}
            alt="cat - probably adorable"
          />
        )}
      </div>
      <div className="w-full bg-white rounded-lg rounded-t-none p-2 flex items-center justify-center">
        {state.state === CatCollectorStates.FETCHING && <p>Loading</p>}
        {state.state === CatCollectorStates.LOADED && (
          <>
            <div
              className={`flex flex-col w-full visibleTransition ${
                searchFormVisible ? "invisible dropOut" : "visible"
              }`}
            >
              <div className="w-full flex items-center justify-center">
                <button
                  className="rounded bg-blue-700 text-white border-none shadow-md mr-2 px-2"
                  onClick={() => state.cat && handleCollectCat(state.cat)}
                >
                  Purrrfect
                </button>
                <button
                  className="rounded bg-red-700 text-white border-none shadow-md px-2 mr-2"
                  onClick={() => state.cat && handleIgnoreCat(state.cat)}
                >
                  Get Another
                </button>
                <button
                  className="rounded bg-green-700 text-white border-none shadow-md px-2"
                  onClick={() =>
                    state.cat && reduxDispatch(favoriteCat(state.cat))
                  }
                >
                  Keep it Forever
                </button>
              </div>
              <button
                onClick={() => setSearchFormVisible(true)}
                className="my-2 bg-teal-600 text-white shadow-md rounded w-1/2 ml-auto mr-auto"
              >
                Or search for your dream cat
              </button>
            </div>
            <CatCollectorSearch
              searchCats={R.compose(
                () => setSearchFormVisible(false),
                searchCats
              )}
              visible={searchFormVisible}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default withCatCollection(CatCollector);
