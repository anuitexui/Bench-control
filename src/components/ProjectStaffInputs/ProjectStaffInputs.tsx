import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { ProjectStaffProps } from "../../data/Projects";
import Button from "../Button/Button";
import InputCheckBox from "../InputCheckbox/InputCheckbox";

import "./ProjectStaffInputs.scss";

interface ProjectStaffInputsProps {
  staff: ProjectStaffProps;
  remove: (id: number) => void;
  changeStaffType: any;
  changeStaffTime: any;
}

export default function ProjectStaffInputs({
  staff,
  remove,
  changeStaffType,
  changeStaffTime,
}: ProjectStaffInputsProps) {
  const [newTime, setNewTime] = useState<number>(staff.time);
  const [staffTypeB, setStaffTypeB] = useState<boolean>(
    staff.billingType == "B" ? true : false
  );
  useEffect(() => {
    changeStaffTime(staff.id, newTime);
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
    if (+e.target.value > 40) {
      setTimeFunc(40);
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
        name="lead-time"
        placeholder="Time"
        className="form__input form__list-time"
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
