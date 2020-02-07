import React, {createContext, useReducer, useContext} from 'react';

const defaultStore = [];
function reducer(state = defaultStore, action) {
  switch (action.type) {
    case 'UPDATE':
      return action.payload;
    case 'ADD_ITEM':
      return state.concat([{name: action.payload, index: state.length + 1}]);
    case 'DEL_ITEM':
      return state.slice(0, state.length - 1);
    default:
      return state;
  }
}

const StoreContext = createContext(null);

export function Provider({children}) {
  const [state, dispatch] = useReducer(reducer, defaultStore);
  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
