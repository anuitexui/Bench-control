import { projects } from "../data/Projects";

export default function initProjects () {
	localStorage.projects = JSON.stringify(projects);
}