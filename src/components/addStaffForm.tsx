import React, { useState } from "react";
import AddStaffDropdown from "./addStaffDropdown";
import Button from "./button";
import { EmployeesProps } from "data/employees";

interface AddStaffFormProps{
	employeesList: Array<EmployeesProps>,
	setEmployeesList:(employeesList: Array<EmployeesProps>)=>void,
	closeForm:(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function AddStaffForm({employeesList, setEmployeesList, closeForm}: AddStaffFormProps): JSX.Element {
	const [staffname, setStaffname] = useState<string>('');
	const [staffRole, setStaffRole] = useState<string>('');
	const [staffStack, setStaffStack] = useState<string>('');
	const [staffExp, setStaffExp] = useState<string>('');
	const [staffSpeak, setStaffSpeak] = useState<string>('');
	const [allowedTime, setAllowedTime] = useState<number>(0);

	const [isEmptyName, setIsEmptyname] = useState<boolean>(false);
	const [isEmptyRole, setIsEmptyRole] = useState<boolean>(false);
	const [isEmptyStack, setIsEmptyStack] = useState<boolean>(false);
	const [isEmptyExp, setIsEmptyExp] = useState<boolean>(false);
	const [isEmptySpeak, setIsEmptySpeak] = useState<boolean>(false);
	const [isEmptyTime, setIsEmptyTime] = useState<boolean>(false);

	function saveEmployee(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		e.preventDefault();
		//new employee ID
		let ids: Array<number> = [];
		for (let employee of employeesList) {
			ids.push(employee.id)
		}
		let newId = Math.max.apply(null, ids) + 1;
		setEmployeesList([
			...employeesList,
			{
				id : newId,
				name : staffname,
				pos : staffRole,
				stack : staffStack,
				exp : staffExp,
				speak : staffSpeak,
				time : allowedTime,
			}
		]);
		closeForm(e);
	};

	function showEmptyFields(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		e.preventDefault();
		staffname? setIsEmptyname(false) : setIsEmptyname(true);
		allowedTime? setIsEmptyTime(false) : setIsEmptyTime(true);
		staffRole? setIsEmptyRole(false) : setIsEmptyRole(true);
		staffStack? setIsEmptyStack(false) : setIsEmptyStack(true);
		staffExp? setIsEmptyExp(false) : setIsEmptyExp(true);
		staffSpeak? setIsEmptySpeak(false) : setIsEmptySpeak(true);
	}

	function validateTime(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key == "-" || e.key == ".") {
			e.preventDefault();
		}
	}

	function setTime(e: React.ChangeEvent<HTMLInputElement>) {
		if (+e.target.value > 40) {
				setAllowedTime(()=> 40);
			} else {
				setAllowedTime(+e.target.value)
			}
	}

	return (
		<form className="tab__form form">
			<div className="form__cell">
				<label htmlFor="name">Name:</label>
				<input 
					placeholder="Name"
					name="name"
					className={isEmptyName? "form__input error": "form__input"}
					type="text"
					value={staffname}
					onChange={(e) => {setStaffname(e.target.value)}}/>
			</div>

			<div className="form__cell">
				<AddStaffDropdown
					optionsId= {0}
					label='Position:'
					value={staffRole}
					placeholder='Select role'
					dropdownClass={isEmptyRole? "dropdown__button error": "dropdown__button"}
					handleChange={(e: { value: React.SetStateAction<string>; }) => setStaffRole(e.value)} />
			</div>

			<div className="form__cell">
				<AddStaffDropdown
					optionsId= {1}
					label='Stack:'
					value={staffStack}
					placeholder='Select stack'
					dropdownClass={isEmptyStack? "dropdown__button error": "dropdown__button"}
					handleChange={(e: { value: React.SetStateAction<string>; }) => setStaffStack(e.value)} />
			</div>

			<div className="form__cell">
				<AddStaffDropdown
					optionsId= {2}
					label='Experience:'
					value={staffExp}
					placeholder='Select experience'
					dropdownClass={isEmptyExp? "dropdown__button error": "dropdown__button"}
					handleChange={(e: { value: React.SetStateAction<string>; }) => setStaffExp(e.value)} />
			</div>

			<div className="form__cell">
				<AddStaffDropdown
					optionsId= {3}
					label='Speaking lvl:'
					value={staffSpeak}
					placeholder='Select speaking lvl'
					dropdownClass={isEmptySpeak? "dropdown__button error": "dropdown__button"}
					handleChange={(e: { value: React.SetStateAction<string>; }) => setStaffSpeak(e.value)} />
			</div>

			<div className="form__cell">
				<label htmlFor="time">Weekly Allowed Time:</label>
				<input
					name="time"
					placeholder="Time"
					className={isEmptyTime? "form__input error": "form__input"}
					min={0}
					max={40}
					type="number"
					value={allowedTime}
					onChange={(e) => {setTime(e)}}
					onKeyDown={(e) => {validateTime(e)}}
					/>
			</div>

			<div className="form__cell">
			{(staffname && staffRole && staffStack && staffExp && staffSpeak && allowedTime)? 
					<Button
						classname="tab__btn"
						label="Save"
						handleClick={(e) => saveEmployee(e)} /> :
					<Button
						classname="tab__btn"
						label="Save"
						handleClick={(e) => showEmptyFields(e)} />}
			</div>
		</form>
	)
}