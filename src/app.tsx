import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Nav } from "./components/nav";
import Bench from "./components/tabs/bench";
import Projects from "./components/tabs/projects";
import Staff from "./components/tabs/staff";
import Options from "./components/tabs/options";
import NotFound from "./components/notfound";

import './scss/main.scss';


const Root = document.getElementById("app") as HTMLElement;

ReactDOM.createRoot(
	Root
)
.render(
	<Router>
		<div>
			<Nav />
			<Routes>
				<Route path="/" element={<Bench />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/staff" element={<Staff />} />
				<Route path="/options" element={<Options />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	</Router>
);
