import { ChangeEvent, useState } from "react";
import Button from "../Button/Button";
import { ProjectStaffProps } from "../../data/Projects";
import ProjectStaffList from "../ProjectStaffList/ProjectStaffList";
import InputAutoStaff from "../InputAuto/InputAutoStaff";
import getEmplyees from "../../utils/GetEmployees";

import "./AddProjectForm.scss";

interface AddProjectFormProps {
  closeForm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface AddStaffprops {
  staffName: "string";
  staffList: (list: Array<ProjectStaffProps>) => void;
}

export default function AddProjectForm({
  closeForm,
}: AddProjectFormProps): JSX.Element {
  const [projectName, setProjectName] = useState<string>("");
  const [leadName, setLeadName] = useState<string>("");
  const [leadTime, setLeadTime] = useState<number>(40);
  const [baName, setBAName] = useState<string>("");
  const [baTime, setBATime] = useState<number>(40);
  const [pmName, setPMName] = useState<string>("");
  const [pmTime, setPMTime] = useState<number>(40);
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [devName, setDevName] = useState<string>("");
  const [devTime, setDevTime] = useState<number>(40);
  const [qaName, setQAName] = useState<string>("");
  const [qaTime, setQATime] = useState<number>(40);

  const [devList, setDevList] = useState<Array<ProjectStaffProps>>([]);
  const [qaList, setQAList] = useState<Array<ProjectStaffProps>>([]);

  const [isNameEmpty, setIsNameEmpty] = useState<boolean>(false);
  const [isLeadEmpty, setIsLeadEmpty] = useState<boolean>(false);
  const [isBAEmpty, setIsBAEmpty] = useState<boolean>(false);
  const [isPMEmpty, setIsPMEmpty] = useState<boolean>(false);
  const [isEmptyInput, setIsEmptyInput] = useState<boolean>(false);
  const [isStartInput, setIsStartInput] = useState<boolean>(false);
  const [isEndInput, setIsEndInput] = useState<boolean>(false);

  const staff = getEmplyees();
  const devs = staff.filter((employ) => employ.pos.toLowerCase() == "dev");
  const qas = staff.filter((employ) => employ.pos.toLowerCase() == "qa");
  const bas = staff.filter((employ) => employ.pos.toLowerCase() == "ba");
  const pms = staff.filter((employ) => employ.pos.toLowerCase() == "pm");

  function validateTime(e: React.KeyboardEvent<HTMLInputElement>) {
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
  }

  function setTime(
    e: ChangeEvent<HTMLInputElement>,
    setTimeFunc: (arg0: number) => void
  ) {
    if (+e.target.value > 40) {
      setTimeFunc(40);
    } else if (e.target.value.length > 1) {
      setTimeFunc(+e.target.value.replace(/^0/, ""));
    } else {
      setTimeFunc(+e.target.value);
    }
  }

  const addDev = () => {
    if (start && end) {
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
    setQAName("23");
    } else {
      start ? setIsStartInput(false) : setIsStartInput(true);
      end ? setIsEndInput(false) : setIsEndInput(true);
    }
  };

  const addQA = () => {
    if (start && end) {
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
  } else {
    start ? setIsStartInput(false) : setIsStartInput(true);
    end ? setIsEndInput(false) : setIsEndInput(true);
  }
  };

  const saveProject = () => {

  }

  return (
    <form className="tab__form form" onSubmit={(e) => e.preventDefault()}>
      <div className="form__row">
        <div className="form__cell">
          <label htmlFor="project-name">Project Name:</label>
          <input
            placeholder="Project Name"
            name="project-name"
            className={isNameEmpty ? "form__input error" : "form__input"}
            type="text"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          />
        </div>
        <div className="form__cell">
          <InputAutoStaff
            classname={isLeadEmpty ? "form__input error" : "form__input"}
            label="Leader:"
            pholder="Lead Name"
            data={staff}
            onSelected={setLeadName}
          />
          <label htmlFor="lead-time">Hour Per Week:</label>
          <input
            name="lead-time"
            placeholder="Time"
            className={isEmptyInput ? "form__input error" : "form__input"}
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
        </div>
        <div className="form__cell">
          <InputAutoStaff
            classname={isBAEmpty ? "form__input error" : "form__input"}
            label="BA:"
            pholder="BA Name"
            data={bas}
            onSelected={setBAName}
          />
          <label htmlFor="ba-time">Hour Per Week:</label>
          <input
            name="ba-time"
            placeholder="Time"
            className={isEmptyInput ? "form__input error" : "form__input"}
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
        </div>
        <div className="form__cell">
          <InputAutoStaff
            classname={isPMEmpty ? "form__input error" : "form__input"}
            label="PM:"
            pholder="PM Name"
            data={pms}
            onSelected={setPMName}
          />
          <label htmlFor="pm-time">Hour Per Week:</label>
          <input
            name="pm-time"
            placeholder="Time"
            className={isEmptyInput ? "form__input error" : "form__input"}
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
        </div>
        <div className="form__cell">
          <label htmlFor="start">Start At:</label>
          <input
            name="start"
            className={isStartInput ? "form__input error" : "form__input"}
            type="date"
            value={start}
            onChange={(e) => {
              setStart(e.target.value);
            }}
          />
          <label htmlFor="start">End At:</label>
          <input
            name="start"
            className={isEndInput ? "form__input error" : "form__input"}
            type="date"
            value={end}
            onChange={(e) => {
              setEnd(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form__row">
        <div className="form__cell form__cell--list">
          <p className="form__subtitle">Project Devs List:</p>
          <ProjectStaffList staffList={devList} setStaffList={setDevList} />
        </div>
        <div className="form__cell">
          <p className="form__subtitle">Adding Dev:</p>

          <InputAutoStaff
            classname={isEmptyInput ? "form__input error" : "form__input"}
            label="Name:"
            pholder={"Dev Name"}
            data={devs}
            onSelected={setDevName}
            currentData={devList}
            // clear={}
          />

          <label htmlFor="dev-time">Hour Per Week:</label>
          <input
            name="dev-time"
            placeholder="Time"
            className={isEmptyInput ? "form__input error" : "form__input"}
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
          <Button classname="tab__btn" label="Add" handleClick={addDev} />
        </div>
        <div className="form__cell form__cell--list">
          <p className="form__subtitle">Project QAs List:</p>
          <ProjectStaffList staffList={qaList} setStaffList={setQAList} />
        </div>
        <div className="form__cell">
          <p className="form__subtitle">Adding QA:</p>
          <InputAutoStaff
            classname={isEmptyInput ? "form__input error" : "form__input"}
            label="Name:"
            pholder={"QA Name"}
            data={qas}
            onSelected={setQAName}
            currentData={qaList}
          />

          <label htmlFor="qa-time">Hour Per Week:</label>
          <input
            name="qa-time"
            placeholder="Time"
            className={isEmptyInput ? "form__input error" : "form__input"}
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
          <Button classname="tab__btn" label="Add" handleClick={addQA} />
        </div>
        <div className="form__cell form__cell--btn">
            <Button classname="tab__btn" handleClick={saveProject} label="Save Project" />
        </div>
      </div>
    </form>
  );
}