import React, { useEffect, useReducer } from "react";
import { getCatImages, CatImage } from "api/cats";

enum CatCollectorStates {
  FETCHING = "FETCHING",
  IDLE = "IDLE"
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

interface CatCollectorIdleState extends CatCollectorState {
  state: CatCollectorStates.IDLE;
  cat?: CatImage;
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
  ) => CatCollectorIdleState;
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
    ): CatCollectorIdleState => {
      return {
        state: CatCollectorStates.IDLE,
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

const CatCollector = () => {
  const [state, dispatch] = useReducer(catCollectorReducer, initialState);
  useEffect(() => {
    const effects = {
      FETCH: () =>
        getCatImages().then(({ data }) => {
          const firstCat = data[0];
          dispatch({ type: ActionTypes.LOAD, payload: { cat: firstCat } });
        })
    };
    if (state.state === "FETCHING") {
      effects.FETCH();
    }
  }, [state]);
  if (state.state === CatCollectorStates.FETCHING) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <img src={state.cat?.url} width="100%" />
    </div>
  );
};

export default CatCollector;
