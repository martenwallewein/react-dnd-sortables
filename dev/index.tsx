import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

const appContext = <App/>;

ReactDOM.render(
    appContext,
    document.getElementById("root") as HTMLElement
);
