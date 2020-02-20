import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { RoomProvider } from "./context";

ReactDOM.render(
  <RoomProvider>
    <Router basename = "/beach">
      <App />
    </Router>
  </RoomProvider>,
  document.getElementById("root")
);

/*wrap all the components in <RoomProvider> so that all 
 components receive the data. The RoomProvider component 
 contains the context*/
serviceWorker.unregister();
