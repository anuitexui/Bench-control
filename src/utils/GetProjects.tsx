import { ProjectProps } from "../data/Projects";

export default function getProjects():  Array<ProjectProps> {
  const projects = JSON.parse( localStorage.projects );
  return projects;
}