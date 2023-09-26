import React, { useState } from "react";
import Dropdown  from 'react-dropdown';
import Button from "./button";
import getOptions from "../utils/getOptions";

interface DropdownProps {
	optionsId: number,
	label: string,
	value: string,
	placeholder: string,
	handleChange: (e: { value: React.SetStateAction<string>; })=>void,
	dropdownClass:string,
}

export default function AddStaffDropdown ({optionsId, label, value, placeholder, dropdownClass, handleChange}: DropdownProps): JSX.Element {

	const [isTipOpen, setIsTipOpen] = useState<boolean>(false);
function showTip(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
	e.preventDefault();
	setIsTipOpen(!isTipOpen);
}

function closeTip(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
	e.preventDefault();
	setIsTipOpen(false);
}

 const optionsList = getOptions(optionsId);
// const optionsList = allOptionsCurrentList[optionsId];

	return<>
		<label>{label}</label>
		<Button classname="form__tip-btn" label="?" handleClick={(e) => showTip(e)} />
			<Dropdown
				options={optionsList}
				value={value}
				placeholder={placeholder}
				className='dropdown'
				arrowClosed={<span className="dropdown__arrow-closed" />}
  			arrowOpen={<span className="dropdown__arrow-open" />}
				controlClassName={dropdownClass}
				menuClassName='dropdown__list' 
				placeholderClassName='dropdown__placeholder'
				onChange={handleChange} />
			<div className={isTipOpen? "form__tip open" : "form__tip "}>
				<Button label="x" classname="form__tip-close" handleClick={(e) => closeTip(e)} />
				{getOptions(optionsId).map((option) => {
					return (
						<div className="form__tip-row" key={option.id}>
							<b>{option.value}</b> - {option.name}
						</div>
					)
				})}
			</div>
		</>
		
}

AddStaffDropdown.defaultProps = {dropdownClass: "dropdown__button"};