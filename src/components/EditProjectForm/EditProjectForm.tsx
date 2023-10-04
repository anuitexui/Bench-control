import Button from "../Button/Button";
import { ProjectProps, ProjectStaffProps } from "../../data/Projects";
import { useState, ChangeEvent } from "react";
import getEmployees from "../../utils/GetEmployees";
import InputAutoStaff from "../InputAuto/InputAutoStaff";
import getProjects from "../../utils/GetProjects";
import InputCheckBox from "../InputCheckbox/InputCheckbox";
import ProjectStaffEditList from "../ProjectStaffEditList/ProjectStaffEditList";
import setProjects from "../../utils/SetProjects";

import "./EditProjectForm.scss";

interface EditProjectFormProps {
  id: number;
  closeForm: () => void;
}

export default function EditProjectForm({
  id,
  closeForm,
}: EditProjectFormProps): JSX.Element {
  const projectsList = getProjects();
  const project: ProjectProps | undefined = projectsList.filter(
    (project) => project.id == id
  )[0];

  const [leadName, setLeadName] = useState<string>(
    project ? project.lead.name : ""
  );
  const [leadTime, setLeadTime] = useState<number>(
    project ? project.lead.time : 40
  );
  const [leadTypeB, setLeadTypeB] = useState<boolean>(
    project?.lead.billingType == "B" ? true : false
  );

  const [baName, setBAName] = useState<string>(project ? project.ba.name : "");
  const [baTime, setBATime] = useState<number>(project ? project.ba.time : 40);
  const [baTypeB, setbaTypeB] = useState<boolean>(
    project?.ba.billingType == "B" ? true : false
  );
  const [pmName, setPMName] = useState<string>(project ? project.pm.name : "");
  const [pmTypeB, setpmTypeB] = useState<boolean>(
    project?.pm.billingType == "B" ? true : false
  );
  const [pmTime, setPMTime] = useState<number>(project ? project.pm.time : 40);
  const [start, setStart] = useState<string>(project ? project.start : "");
  const [end, setEnd] = useState<string>(project ? project.end : "");
  const [devName, setDevName] = useState<string>("");
  const [devTime, setDevTime] = useState<number>(40);
  const [qaName, setQAName] = useState<string>("");
  const [qaTime, setQATime] = useState<number>(40);

  const [devList, setDevList] = useState<Array<ProjectStaffProps>>(
    project ? project.devs : []
  );
  const [qaList, setQAList] = useState<Array<ProjectStaffProps>>(
    project ? project.qas : []
  );

  const [isLeadEmpty, setIsLeadEmpty] = useState<boolean>(false);
  const [isBAEmpty, setIsBAEmpty] = useState<boolean>(false);
  const [isPMEmpty, setIsPMEmpty] = useState<boolean>(false);
  const [isStartEmpty, setIsStartEmpty] = useState<boolean>(false);
  const [isEndEmpty, setIsEndEmpty] = useState<boolean>(false);

  const [clearDev, setClearDev] = useState<boolean>(false);
  const [clearQA, setClearQA] = useState<boolean>(false);

  const staff = getEmployees();
  const devs = staff.filter((employ) => employ.pos.toLowerCase() == "dev");
  const qas = staff.filter((employ) => employ.pos.toLowerCase() == "qa");
  const bas = staff.filter((employ) => employ.pos.toLowerCase() == "ba");
  const pms = staff.filter((employ) => employ.pos.toLowerCase() == "pm");

  const validateTime = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.keyCode == 46 ||
      e.keyCode == 8 ||
      e.keyCode == 9 ||
      e.keyCode == 27 ||
      // Разрешаем: home, end, влево, вправо
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return;
    } else if (e.keyCode < 48 || e.keyCode > 57) {
      e.preventDefault();
    }
  };

  const setTime = (
    e: ChangeEvent<HTMLInputElement>,
    setTimeFunc: (arg0: number) => void
  ) => {
    if (+e.target.value > 40) {
      setTimeFunc(40);
    } else if (e.target.value.length > 1) {
      setTimeFunc(+e.target.value.replace(/^0/, ""));
    } else {
      setTimeFunc(+e.target.value);
    }
  };

  const addDev = () => {
    start ? setIsStartEmpty(false) : setIsStartEmpty(true);
    end ? setIsEndEmpty(false) : setIsEndEmpty(true);
    if (start && end && devName) {
      const newDevList = [
        ...devList,
        {
          id: staff.filter((s) => s.name == devName)[0]!.id,
          name: devName,
          time: devTime,
          start: start,
          end: end,
          billingType: "B",
        },
      ];
      setDevList(newDevList);
      setDevName("");
      setClearDev(() => true);
    }
  };

  const addQA = () => {
    start ? setIsStartEmpty(false) : setIsStartEmpty(true);
    end ? setIsEndEmpty(false) : setIsEndEmpty(true);
    if (start && end && qaName) {
      const newQAList = [
        ...qaList,
        {
          id: staff.filter((s) => s.name == qaName)[0]!.id,
          name: qaName,
          time: qaTime,
          start: start,
          end: end,
          billingType: "B",
        },
      ];
      setQAList(newQAList);
      setQAName("");
      setClearQA(() => true);
    }
  };

  const saveProject = () => {
    start ? setIsStartEmpty(false) : setIsStartEmpty(true);
    end ? setIsEndEmpty(false) : setIsEndEmpty(true);
    if (start && end) {
      const leadID: number =
        staff.filter((employ) => employ.name == leadName)[0]?.id || 0;
      const baID: number =
        staff.filter((employ) => employ.name == baName)[0]?.id || 0;
      const pmID: number =
        staff.filter((employ) => employ.name == pmName)[0]?.id || 0;

      const editedProjectsList: Array<ProjectProps> = projectsList.map(
        (proj) => {
          if (proj.id == id) {
            return {
              ...proj,
              id: id,
              name: project ? project.name : "",
              lead: {
                id: leadID,
                name: leadName,
                time: leadTime,
                start: start,
                end: end,
                billingType: leadTypeB ? "B" : "UB",
              },
              ba: {
                id: baID,
                name: baName,
                time: baTime,
                start: start,
                end: end,
                billingType: baTypeB ? "B" : "UB",
              },
              pm: {
                id: pmID,
                name: pmName,
                time: pmTime,
                start: start,
                end: end,
                billingType: pmTypeB ? "B" : "UB",
              },
              start: start,
              end: end,
              devs: devList,
              qas: qaList,
              isActive: project ? project.isActive : false,
            };
          } else return proj;
        }
      );
      setProjects(editedProjectsList);
      closeForm();
    }
  };

  return (
    <form
      className="tab__form form form-edit"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="form__title">{project ? project.name : ""}</h2>
      <div className="form__row">
        <div className="form__cell">
          <InputAutoStaff
            classname={isLeadEmpty ? "form__input error" : "form__input"}
            label="Leader:"
            pholder="Lead Name"
            data={staff}
            onSelected={setLeadName}
            defaultValue={leadName}
          />
          <label htmlFor="lead-time">Hour Per Week:</label>
          <input
            name="lead-time"
            placeholder="Time"
            className="form__input"
            min={0}
            max={40}
            type="text"
            value={leadTime}
            onChange={(e) => {
              setTime(e, setLeadTime);
            }}
            onKeyDown={(e) => {
              validateTime(e);
            }}
          />
          <InputCheckBox
            classname="project-edit__switch project-edit__switch--top"
            checked={leadTypeB}
            handleChange={() => setLeadTypeB(!leadTypeB)}
            label="TypeB:"
          />
        </div>
        <div className="form__cell">
          <InputAutoStaff
            classname={isBAEmpty ? "form__input error" : "form__input"}
            label="BA:"
            pholder="BA Name"
            data={bas}
            onSelected={setBAName}
            defaultValue={baName}
          />
          <label htmlFor="ba-time">Hour Per Week:</label>
          <input
            name="ba-time"
            placeholder="Time"
            className={isBAEmpty ? "form__input error" : "form__input"}
            min={0}
            max={40}
            type="text"
            value={baTime}
            onChange={(e) => {
              setTime(e, setBATime);
            }}
            onKeyDown={(e) => {
              validateTime(e);
            }}
          />
          <InputCheckBox
            classname="project-edit__switch project-edit__switch--top"
            checked={baTypeB}
            handleChange={() => setbaTypeB(!baTypeB)}
            label="TypeB:"
          />
        </div>
        <div className="form__cell">
          <InputAutoStaff
            classname={isPMEmpty ? "form__input error" : "form__input"}
            label="PM:"
            pholder="PM Name"
            data={pms}
            onSelected={setPMName}
            defaultValue={pmName}
          />
          <label htmlFor="pm-time">Hour Per Week:</label>
          <input
            name="pm-time"
            placeholder="Time"
            className={isPMEmpty ? "form__input error" : "form__input"}
            min={0}
            max={40}
            type="text"
            value={pmTime}
            onChange={(e) => {
              setTime(e, setPMTime);
            }}
            onKeyDown={(e) => {
              validateTime(e);
            }}
          />
          <InputCheckBox
            classname="project-edit__switch project-edit__switch--top"
            checked={pmTypeB}
            handleChange={() => setpmTypeB(!pmTypeB)}
            label="TypeB:"
          />
        </div>
        <div className="form__cell">
          <label htmlFor="start">Start At:</label>
          <input
            name="start"
            className={isStartEmpty ? "form__input error" : "form__input"}
            type="date"
            value={start}
            onChange={(e) => {
              setStart(e.target.value);
            }}
          />
          <label htmlFor="start">End At:</label>
          <input
            name="start"
            className={isEndEmpty ? "form__input error" : "form__input"}
            type="date"
            value={end}
            onChange={(e) => {
              setEnd(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form__row form__row-edit">
        <div className="form__cell form__cell--edit-list">
          <p className="form__subtitle">Project Devs List:</p>
          <ProjectStaffEditList staffList={devList} setStaffList={setDevList} />
          <p className="form__subtitle">Add Dev:</p>
          <div className="form__inputs--edit">
            <InputAutoStaff
              classname="form__input form__edit-input--name"
              label="Name:"
              pholder={"Dev Name"}
              data={devs}
              onSelected={setDevName}
              currentData={devList}
              clear={clearDev}
              setClear={setClearDev}
            />
            <div className="form__edit-input--time">
              <label htmlFor="dev-time">h/Week:</label>
              <input
                name="dev-time"
                placeholder="Time"
                className="form__input"
                min={0}
                max={40}
                type="text"
                value={devTime}
                onChange={(e) => {
                  setTime(e, setDevTime);
                }}
                onKeyDown={(e) => {
                  validateTime(e);
                }}
              />
            </div>
            <Button classname="tab__btn" label="Add" handleClick={addDev} />
          </div>
        </div>
        <div className="form__cell form__cell--edit-list">
          <p className="form__subtitle">Project QAs List:</p>
          <ProjectStaffEditList staffList={qaList} setStaffList={setQAList} />
          <p className="form__subtitle">Add QA:</p>
          <div className="form__inputs--edit">
            <InputAutoStaff
              classname="form__input form__edit-input--name"
              label="Name:"
              pholder={"QA Name"}
              data={qas}
              onSelected={setQAName}
              currentData={qaList}
              clear={clearQA}
              setClear={setClearQA}
            />
            <div className="form__edit-input--time">
              <label htmlFor="qa-time">h/Week:</label>
              <input
                name="qa-time"
                placeholder="Time"
                className="form__input"
                min={0}
                max={40}
                type="text"
                value={qaTime}
                onChange={(e) => {
                  setTime(e, setQATime);
                }}
                onKeyDown={(e) => {
                  validateTime(e);
                }}
              />
            </div>
            <Button classname="tab__btn" label="Add" handleClick={addQA} />
          </div>
        </div>
        <div className="form__cell form__cell--btn">
          <Button classname="tab__btn" handleClick={saveProject} label="Save" />
          <Button
            classname="tab__btn tab__btn--red"
            handleClick={closeForm}
            label="Cancel"
          />
        </div>
      </div>
    </form>
  );
}
