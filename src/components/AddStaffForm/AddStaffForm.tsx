import React, { useState } from "react";
import AddStaffDropdown from "../AddStaffDropdown/AddStaffDropdown";
import Button from "../Button/Button";
import { EmployeesProps } from "../../data/Employees";
import setEmployees from "../../utils/SetEmployees";

import "./AddStaffForm.scss";

interface AddStaffFormProps {
  employeesList: Array<EmployeesProps>;
  closeForm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function AddStaffForm({
  employeesList,
  closeForm,
}: AddStaffFormProps): JSX.Element {
  const [staffname, setStaffname] = useState<string>("");
  const [staffRole, setStaffRole] = useState<string>("");
  const [staffStack, setStaffStack] = useState<string>("");
  const [staffExp, setStaffExp] = useState<string>("");
  const [staffSpeak, setStaffSpeak] = useState<string>("");
  const [allowedTime, setAllowedTime] = useState<number>(0);

  const [isEmptyName, setIsEmptyname] = useState<boolean>(false);
  const [isEmptyRole, setIsEmptyRole] = useState<boolean>(false);
  const [isEmptyStack, setIsEmptyStack] = useState<boolean>(false);
  const [isEmptyExp, setIsEmptyExp] = useState<boolean>(false);
  const [isEmptySpeak, setIsEmptySpeak] = useState<boolean>(false);
  const [isEmptyTime, setIsEmptyTime] = useState<boolean>(false);

  const saveEmployee =(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    staffname ? setIsEmptyname(false) : setIsEmptyname(true);
    allowedTime ? setIsEmptyTime(false) : setIsEmptyTime(true);
    staffRole ? setIsEmptyRole(false) : setIsEmptyRole(true);
    staffStack ? setIsEmptyStack(false) : setIsEmptyStack(true);
    staffExp ? setIsEmptyExp(false) : setIsEmptyExp(true);
    staffSpeak ? setIsEmptySpeak(false) : setIsEmptySpeak(true);
    if (
      staffname &&
      staffRole &&
      staffStack &&
      staffExp &&
      staffSpeak &&
      allowedTime
    ) {
      //new employee ID
      let ids: Array<number> = [];
      for (let employee of employeesList) {
        ids.push(employee.id);
      }
      let newId = Math.max.apply(null, ids) + 1;
      const newEmployeesList = [
        ...employeesList,
        {
          id: newId,
          name: staffname,
          pos: staffRole,
          stack: staffStack,
          exp: staffExp,
          speak: staffSpeak,
          time: allowedTime,
        },
      ];
      setEmployees(newEmployeesList);
      closeForm(e);
    }
  }

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
  }

  const setTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > 40) {
      setAllowedTime(() => 40);
    } else if (e.target.value.length > 1) {
      setAllowedTime(+e.target.value.replace(/^0/, ""));
    } else {
      setAllowedTime(+e.target.value);
    }
  }

  return (
    <form className="tab__form form" onSubmit={(e) => e.preventDefault()}>
      <div className="form__cell">
        <label htmlFor="name">Name:</label>
        <input
          placeholder="Name"
          name="name"
          className={isEmptyName ? "form__input error" : "form__input"}
          type="text"
          value={staffname}
          onChange={(e) => {
            setStaffname(e.target.value);
          }}
        />
      </div>

      <div className="form__cell">
        <AddStaffDropdown
          optionsName="roles"
          label="Position:"
          value={staffRole}
          placeholder="Select role"
          dropdownClass={
            isEmptyRole ? "dropdown__button error" : "dropdown__button"
          }
          handleChange={(e: { value: React.SetStateAction<string> }) =>
            setStaffRole(e.value)
          }
        />
      </div>

      <div className="form__cell">
        <AddStaffDropdown
          optionsName="stacks"
          label="Stack:"
          value={staffStack}
          placeholder="Select stack"
          dropdownClass={
            isEmptyStack ? "dropdown__button error" : "dropdown__button"
          }
          handleChange={(e: { value: React.SetStateAction<string> }) =>
            setStaffStack(e.value)
          }
        />
      </div>

      <div className="form__cell">
        <AddStaffDropdown
          optionsName="exps"
          label="Experience:"
          value={staffExp}
          placeholder="Select experience"
          dropdownClass={
            isEmptyExp ? "dropdown__button error" : "dropdown__button"
          }
          handleChange={(e: { value: React.SetStateAction<string> }) =>
            setStaffExp(e.value)
          }
        />
      </div>

      <div className="form__cell">
        <AddStaffDropdown
          optionsName="speakLvl"
          label="Speaking lvl:"
          value={staffSpeak}
          placeholder="Select speaking lvl"
          dropdownClass={
            isEmptySpeak ? "dropdown__button error" : "dropdown__button"
          }
          handleChange={(e: { value: React.SetStateAction<string> }) =>
            setStaffSpeak(e.value)
          }
        />
      </div>

      <div className="form__cell">
        <label htmlFor="time">Weekly Allowed Time:</label>
        <input
          name="time"
          placeholder="Time"
          className={isEmptyTime ? "form__input error" : "form__input"}
          min={0}
          max={40}
          type="text"
          value={allowedTime}
          onChange={(e) => {
            setTime(e);
          }}
          onKeyDown={(e) => {
            validateTime(e);
          }}
        />
      </div>

      <div className="form__cell">
        <Button
          classname="tab__btn"
          label="Save"
          handleClick={(e) => saveEmployee(e)}
        />
      </div>
    </form>
  );
}
