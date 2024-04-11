import React from "react";
import ReactDOM from "react-dom";
import App  from "./Components/App";
import { createRoot } from "react-dom/client";

//Coger con DOM  el elemento en donde se va a montar el componerte APP de React
const root = createRoot(document.getElementById("root"));
root.render(<App />);