import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import "antd/dist/antd.css";
import "./styles/main.css";

const app = (
  <BrowserRouter>
    <SnackbarProvider
      preventDuplicate={true}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      className={"snackbar"}
      maxSnack={3}
    >
      <App />
    </SnackbarProvider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
