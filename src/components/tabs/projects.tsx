import { useState } from "react";
import Button from "../Button/Button";
import AddProjectForm from "../AddProjectForm/AddProjectForm";
import ProjectsList from "../ProjectsList/ProjectsList";
import getProjects from "../../utils/GetProjects";
import RemoveConfirm from "../RemoveConfirm/RemoveConfirm";
import setProjects from "../../utils/SetProjects";
import EditProjectForm from "../EditProjectForm/EditProjectForm";

export default function Projects() {
  const projects = getProjects();

  const [isAddFormOpen, setIsAddFormOpen] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [isRemoveFormOpen, setIsRemoveFormOpen] = useState<boolean>(false);
  const [projectEditId, setProjectEditId] = useState<number>(0);
  const [removeProjectID, setRemoveProjectID] = useState<number>(0);

  const ShowAddForm = (): JSX.Element | null => {
    if (isAddFormOpen) {
      return (
        <AddProjectForm
          projectsList={projects}
          closeForm={() => setIsAddFormOpen(false)}
        />
      );
    }
    return null;
  };

  const editFormToggle = (id: number) => {
    setIsEditFormOpen(!isEditFormOpen);
    setProjectEditId(id);
  };

  const ShowEditForm = (): JSX.Element | null => {
    if (isEditFormOpen) {
      return (
        <EditProjectForm
          id={projectEditId}
          projectsList={projects}
          closeForm={() => setIsEditFormOpen(false)}
        />
      );
    }
    return null;
  };

  const projectDeleteConfirm = (id: number) => {
    setRemoveProjectID(id);
    setIsRemoveFormOpen(true);
  };

  const ShowDeleteForm = () => {
    if (isRemoveFormOpen) {
      const project = projects.filter(
        (project) => project.id == removeProjectID
      )[0];
      const projectName = project ? project.name : "";
      return (
        <RemoveConfirm
          name={projectName}
          cancel={() => setIsRemoveFormOpen(false)}
          remove={() => projectDelete(removeProjectID)}
        />
      );
    }
  };

  const projectDelete = (id: number) => {
    setIsRemoveFormOpen(false);
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div className="tab__body">
      <Button
        classname={
          isAddFormOpen
            ? "tab__btn tab__btn--close tab__btn--red"
            : "tab__btn tab__btn--add"
        }
        label={isAddFormOpen ? "X" : "Add"}
        handleClick={() => setIsAddFormOpen(!isAddFormOpen)}
      />
      <ShowAddForm />
      <ProjectsList
        projectEdit={editFormToggle}
        projectDelete={projectDeleteConfirm}
      />
      <ShowEditForm />
      <ShowDeleteForm />
    </div>
  );
}
