import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { Nav } from "./scripts/Nav";
import { Slider } from "./scripts/Slider";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Nav />
		<Slider />
	</React.StrictMode>
);

reportWebVitals();
