import React, { useState } from "react";
import AddStaffDropdown from "../AddStaffDropdown/AddStaffDropdown";
import Button from "../Button/Button";
import { EmployeesProps } from "data/Employees";
import setEmployees from "../../utils/SetEmployees";

import "./EditStaffForm.scss";

interface FormProps {
  id: number;
  employeesList: Array<EmployeesProps>;
  isFormOpen: (isEditFormOpen: boolean) => void;
  cancelEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function EditStaffForm({
  id,
  employeesList,
  isFormOpen,
  cancelEdit,
}: FormProps): JSX.Element {
  let employId: number = id;
  let employ: EmployeesProps | undefined = employeesList.find(
    (employee) => employee.id == employId
  );

  const [staffname, setStaffname] = useState<string>(employ ? employ.name : "");
  const [staffRole, setStaffRole] = useState<string>(employ ? employ.pos : "");
  const [staffStack, setStaffStack] = useState<string>(
    employ ? employ.stack : ""
  );
  const [staffExp, setStaffExp] = useState<string>(employ ? employ.exp : "");
  const [staffSpeak, setStaffSpeak] = useState<string>(
    employ ? employ.speak : ""
  );
  const [allowedTime, setAllowedTime] = useState<number>(
    employ ? employ.time : 40
  );

  const saveEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const editedEmploy = employeesList.map((employ) => {
      if (employ.id == employId) {
        return {
          ...employ,
          name: staffname,
          pos: staffRole,
          stack: staffStack,
          exp: staffExp,
          speak: staffSpeak,
          time: allowedTime,
        };
      } else return employ;
    });
    setEmployees(editedEmploy);
    isFormOpen(false);
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
    <form className="tab__form tab__form-edit form">
      <div className="form__cell">
        <label htmlFor="name">Name:</label>
        <input
          className="form__input"
          name="name"
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
          handleChange={(e: { value: React.SetStateAction<string> }) =>
            setStaffSpeak(e.value)
          }
        />
      </div>

      <div className="form__cell">
        <label htmlFor="time">Weekly Allowed Time:</label>
        <input
          name="time"
          className="form__input"
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

      <div className="form__cell form__cell--btns">
        <Button
          classname="tab__btn"
          label="Save"
          handleClick={(e) => saveEdit(e)}
        />
        <Button
          classname="tab__btn tab__btn--red"
          label="Cancel"
          handleClick={(e) => cancelEdit(e)}
        />
      </div>
    </form>
  );
}
