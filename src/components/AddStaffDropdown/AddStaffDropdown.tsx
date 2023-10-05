import React, { useState } from "react";
import Dropdown from "react-dropdown";
import Button from "../Button/Button";
import getAllOptions from "../../utils/GetAllOptions";
import Tooltips from "../Tooltips/Tooltips";

import "./AddStaffDropdown.scss";

interface DropdownProps {
  optionsName: string;
  label: string;
  value: string;
  placeholder: string;
  handleChange: (e: { value: React.SetStateAction<string> }) => void;
  dropdownClass: string;
}

export default function AddStaffDropdown({
  optionsName,
  label,
  value,
  placeholder,
  dropdownClass,
  handleChange,
}: DropdownProps): JSX.Element {
  const [isTipOpen, setIsTipOpen] = useState<boolean>(false);
  const [btnPosition, setBtnPostion] = useState<number>(0);
  const optionsList = getAllOptions()[optionsName] || [];

  const closeTip = () => {
    setIsTipOpen(false);
  };

  const openTooltip = (e: any) => {
    e.preventDefault();
    setBtnPostion(e.target.getBoundingClientRect().right);
    setIsTipOpen(true);
  };

  const ShowTooltip = () => {
    if (isTipOpen) {
      return (
        <Tooltips
          closeTip={closeTip}
          btnPosition={btnPosition}
          children={optionsList.map((option) => {
            return (
              <div className="form__tip-row" key={option.id}>
                <b>{option.value}</b> - {option.name}
              </div>
            );
          })}
        />
      );
    } else return null;
  };

  return (
    <>
      <label>{label}</label>
      <Button
        classname="form__tip-btn"
        label="?"
        handleClick={(e) => openTooltip(e)}
      />
      <Dropdown
        options={optionsList}
        value={value}
        placeholder={placeholder}
        className="dropdown"
        arrowClosed={<span className="dropdown__arrow-closed" />}
        arrowOpen={<span className="dropdown__arrow-open" />}
        controlClassName={dropdownClass}
        menuClassName="dropdown__list"
        placeholderClassName="dropdown__placeholder"
        onChange={handleChange}
      />
      <ShowTooltip />
    </>
  );
}

AddStaffDropdown.defaultProps = { dropdownClass: "dropdown__button" };
