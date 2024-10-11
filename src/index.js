import React from "react";
import ReactDom from 'react-dom';
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "font-awesome/css/font-awesome.css";
import "jquery";
import "popper.js/dist/umd/popper";
import "./index.css";



ReactDom.render(
    <div> <App /> </div>, document.getElementById("root")
);


