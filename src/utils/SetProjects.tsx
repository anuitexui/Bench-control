import { ProjectProps } from "../data/Projects";

export default function setProjects (newProjects: Array<ProjectProps>) {
	localStorage.projects = JSON.stringify(newProjects);
}