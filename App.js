import React from "react";

// import redux related components
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import reducers from "./src/redux/reducers";

import Main from "./src/Main";

const App = () => {
  return(
    <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
      <Main />
    </Provider>
  )
}

export default App;
