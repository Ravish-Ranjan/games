import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { Nav } from "./scripts/Nav";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Nav />
	</React.StrictMode>
);

reportWebVitals();
