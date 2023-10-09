import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { ProjectProps, ProjectStaffProps } from "../../data/Projects";
import Button from "../Button/Button";
import InputCheckBox from "../InputCheckbox/InputCheckbox";
import getStaffProjectsTime from "../../utils/GetStaffProjectsTime";
import { EmployeesProps } from "../../data/Employees";

import "./ProjectStaffInputs.scss";

interface ProjectStaffInputsProps {
  staff: ProjectStaffProps;
  allStaffList: Array<EmployeesProps>,
  remove: (id: number) => void;
  changeStaffType: any;
  changeStaffTime: any;
  projectsList: Array<ProjectProps>,
}

export default function ProjectStaffInputs({
  staff,
  allStaffList,
  remove,
  changeStaffType,
  changeStaffTime,
  projectsList,
}: ProjectStaffInputsProps) {
  const [newTime, setNewTime] = useState<number>(staff.time);
  
  const [staffTypeB, setStaffTypeB] = useState<boolean>(
    staff.billingType == "B" ? true : false
  );
  

  const staffMaxTime = allStaffList.filter((employ) => employ.id == staff.id)[0]?.time || 40;
  const freeTime = staffMaxTime - getStaffProjectsTime(staff.id, projectsList ,"B");
  const [maxtime, setMaxTime] = useState<number>(freeTime);
  const [isTimeEnough, setIsTimeEnough] = useState<boolean>(true);

  useEffect(() => {
    changeStaffTime(staff.id, newTime);
    if (newTime > maxtime) {
        setIsTimeEnough(false);
    }
  }, [newTime]);


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
    setTimeFunc: { (value: SetStateAction<number>): void; (arg0: number): void }
  ) => {
    setIsTimeEnough(true);
    if (+e.target.value > maxtime) {
      setTimeFunc(maxtime);
    } else if (e.target.value.length > 1) {
      setTimeFunc(+e.target.value.replace(/^0/, ""));
    } else {
      setTimeFunc(+e.target.value);
    }
  };

  const changeType = (id: number, staffTypeB: boolean) => {
    changeStaffType(id, staffTypeB);
    setStaffTypeB(!staffTypeB);
  };

  return (
    <>
      <span className="form__list-name">{staff.name}</span>
      <input
        name="staff-time"
        placeholder="Time"
        className={isTimeEnough ? "form__input form__list-time" : "form__input form__list-time error"}
        min={0}
        max={40}
        type="text"
        value={newTime}
        onChange={(e) => {
          setTime(e, setNewTime);
        }}
        onKeyDown={(e) => {
          validateTime(e);
        }}
      />
      <InputCheckBox
        classname="project-edit__switch form__list-switch"
        checked={staffTypeB}
        handleChange={() => changeType(staff.id, staffTypeB)}
      />
      <span className="form__list-btn-cell">
        <Button
          classname="form__list-btn"
          handleClick={(e) => remove(staff.id)}
          label="X"
        />
      </span>
    </>
  );
}
