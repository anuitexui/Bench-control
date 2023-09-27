import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav/Nav";
import Bench from "./components/Tabs/Bench";
import Projects from "./components/Tabs/Projects";
import Staff from "./components/Tabs/Staff";
import Options from "./components/Tabs/Options";
import NotFound from "./components/NotFound/Notfound";
import initEmployees from "./utils/InitEmployees";
import initOptions from "./utils/InitOptions";

import './scss/main.scss';

const Root = document.getElementById("app") as HTMLElement;
//init Employees to Local Storage
initEmployees();
//init Options to Local Storage
initOptions();

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
