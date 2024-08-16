import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Store, persistor } from "./redux/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <PersistGate loading={"loading"} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
