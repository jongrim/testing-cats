import React, { useEffect, useReducer } from "react";
import { ConnectedProps } from "react-redux";
import * as R from "ramda";
import { CatImage } from "ts/Cat";
import { getCatImages } from "./api/cats";
import withCatCollection from "./withCatCollection";

enum CatCollectorStates {
  FETCHING = "FETCHING",
  LOADED = "LOADED"
}

interface CatCollectorState {
  state: CatCollectorStates;
  cat?: CatImage;
  page: number;
}

interface CatCollectorFetchingState extends CatCollectorState {
  state: CatCollectorStates.FETCHING;
  page: number;
}

interface CatCollectorLoadedState extends CatCollectorState {
  state: CatCollectorStates.LOADED;
  cat: CatImage;
  page: number;
}

enum ActionTypes {
  FETCH = "FETCH",
  LOAD = "LOAD"
}

interface Action {
  payload?: object;
}

interface FetchCatAction extends Action {
  type: ActionTypes.FETCH;
  payload: {
    page: number;
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
        page: action.payload.page
      };
    },
    LOAD: (
      state: CatCollectorState,
      action: LoadCatAction
    ): CatCollectorLoadedState => {
      return {
        state: CatCollectorStates.LOADED,
        cat: action.payload.cat,
        page: state.page
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
  page: 0
};

type ReduxProps = ConnectedProps<typeof withCatCollection>;

const CatCollector: React.FC<ReduxProps> = ({ collectCat, ignoreCat }) => {
  const [state, dispatch] = useReducer(catCollectorReducer, initialState);

  const getNextCat = () => {
    dispatch({
      type: ActionTypes.FETCH,
      payload: { page: state.page + 1 }
    });
  };

  const handleIgnoreCat = R.compose(getNextCat, ignoreCat);
  const handleCollectCat = R.compose(getNextCat, collectCat);

  useEffect(() => {
    const effects = {
      FETCH: () =>
        getCatImages({ page: state.page }).then(({ data }) => {
          const firstCat = data[0];
          dispatch({ type: ActionTypes.LOAD, payload: { cat: firstCat } });
        })
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
      <div className="w-full h-24 bg-white rounded-lg rounded-t-none p-2 flex items-center justify-center">
        {state.state === CatCollectorStates.FETCHING && <p>Loading</p>}
        {state.state === CatCollectorStates.LOADED && (
          <>
            <button
              className="rounded bg-blue-700 text-white border-none shadow-md mr-2 px-2"
              onClick={() => state.cat && handleCollectCat({ cat: state.cat })}
            >
              Purrrfect
            </button>
            <button
              className="rounded bg-red-700 text-white border-none shadow-md px-2"
              onClick={() => state.cat && handleIgnoreCat({ cat: state.cat })}
            >
              Get Another
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default withCatCollection(CatCollector);
