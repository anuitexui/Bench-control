import setProjects from "../../utils/SetProjects";
import { useState } from "react";
import getProjects from "../../utils/GetProjects";
import Button from "../Button/Button";
import InputCheckBox from "../InputCheckbox/InputCheckbox";

import "./ProjectsList.scss";

interface ProjectsListProps {
  projectEdit: (id: number) => void;
  projectDelete: (id: number) => void;
}

export default function ProjectsList({
  projectEdit,
  projectDelete,
}: ProjectsListProps) {
  //
  const projects = getProjects();
  const [currentProjects, setcurrentProjects] = useState(projects);
  const changeActive = (id: number, active: boolean) => {
    const editedProjects = projects.map((project) => {
      if (project.id == id) {
        return {
          ...project,
          isActive: !active,
        };
      } else return project;
    });
    setProjects(editedProjects);
    setcurrentProjects(getProjects());
  };

  return (
    <div className="tab__projects">
      {projects.length ? (
        projects.map((project) => {
          return (
            <div
              className={
                project.isActive
                  ? "tab__project project active"
                  : "tab__project project"
              }
              key={project.id}
            >
              <div className="project__head">
                <p className="project__title">{project.name}</p>
                <InputCheckBox
                  classname="project__switch"
                  checked={project.isActive}
                  handleChange={() =>
                    changeActive(project.id, project.isActive)
                  }
                  label="Active:"
                />
              </div>
              <div className="project__body">
                <p className="project__info">
                  <span className="project__label">Dev Count:</span>{" "}
                  {project.devs.length}
                </p>
                <p className="project__info">
                  <span className="project__label">QA Count:</span>{" "}
                  {project.qas.length}
                </p>
                <p className="project__info">
                  <span className="project__label">Lead:</span>{" "}
                  {project.lead.name} - {project.lead.time}h Type:
                  {project.lead.billingType}
                </p>
                <p className="project__info">
                  <span className="project__label">BA:</span> {project.ba.name}{" "}
                  - {project.ba.time}h Type:{project.ba.billingType}
                </p>
                <p className="project__info">
                  <span className="project__label">PM:</span> {project.pm.name}{" "}
                  - {project.pm.time}h Type:{project.pm.billingType}
                </p>
                <p className="project__info">
                  <span className="project__label">StartAt:</span>{" "}
                  {project.start}
                </p>
                <p className="project__info">
                  <span className="project__label">EndAt:</span> {project.end}
                </p>
              </div>
              <div className="project__lists">
                <div className="project__list">
                  {project.devs.map((dev) => {
                    return (
                      <div className="project__list-item" key={dev.id}>
                        <span className="project__label">Dev:</span>
                        <p className="project__list-name">{dev.name}</p>
                        <p className="project__list-time">{dev.time}h</p>
                        <p className="project__list-type">Type: {dev.billingType}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="project__list">
                  {project.qas.map((qa) => {
                    return (
                      <div className="project__list-item" key={qa.id}>
                        <span className="project__label">QA:</span>
                        <p className="project__list-name">{qa.name}</p>
                        <p className="project__list-time">{qa.time}h</p>
                        <p className="project__list-type">Type: {qa.billingType}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="project__buttons">
                  <Button
                    classname="tab__btn"
                    handleClick={() => projectEdit(project.id)}
                    label="Edit"
                  />
                  <Button
                    classname="tab__btn tab__btn--remove"
                    label={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z" />
                      </svg>
                    }
                    handleClick={() => projectDelete(project.id)}
                  />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>There are no projects yet...</p>
      )}
    </div>
  );
}
