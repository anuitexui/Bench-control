import React, { useState } from "react";
import AddStaffDropdown from "./addStaffDropdown";
import Button from "./button";
import { EmployeesProps } from "data/employees";

interface FormProps {
	id: number,
	employeesList: Array<EmployeesProps>,
	setEmployeesList:(employeesList: Array<EmployeesProps>) => void,
	isFormOpen:(isEditFormOpen: boolean) => void,
	cancelEdit:(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function EditStaffForm({id, employeesList, setEmployeesList, isFormOpen, cancelEdit}: FormProps): JSX.Element {

	let employId: number = id;
	let employ: EmployeesProps | undefined = employeesList.find(employee => employee.id == employId);

	const [staffname, setStaffname] = useState<string>(employ ? employ.name : '');
	const [staffRole, setStaffRole] = useState<string>(employ ? employ.pos : '');
	const [staffStack, setStaffStack] = useState<string>(employ ? employ.stack : '');
	const [staffExp, setStaffExp] = useState<string>(employ ? employ.exp : '');
	const [staffSpeak, setStaffSpeak] = useState<string>(employ ? employ.speak : '');
	const [allowedTime, setAllowedTime] = useState<number>(employ ? employ.time : 40);

	function saveEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();

		const editedEmploy = employeesList.map(employ => {
			if (employ.id == employId) {
				return {
					...employ,
					name : staffname,
					pos : staffRole,
					stack : staffStack,
					exp : staffExp,
					speak : staffSpeak,
					time : allowedTime,
				}
			} else return employ;
		});
		setEmployeesList(editedEmploy);
		isFormOpen(false);
	}

	return (
		<form className="tab__form tab__form--edit form">
			<div className="form__cell">
				<label htmlFor="name">Name:</label>
				<input 
					className="form__input"
					name="name"
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
					handleChange={(e: { value: React.SetStateAction<string>; }) => setStaffRole(e.value)} />
			</div>

			<div className="form__cell">
				<AddStaffDropdown
					optionsId= {1}
					label='Stack:'
					value={staffStack}
					placeholder='Select stack'
					handleChange={(e: { value: React.SetStateAction<string>; }) => setStaffStack(e.value)} />
			</div>

			<div className="form__cell">
				<AddStaffDropdown
					optionsId= {2}
					label='Experience:'
					value={staffExp}
					placeholder='Select experience'
					handleChange={(e: { value: React.SetStateAction<string>; }) => setStaffExp(e.value)} />
			</div>

			<div className="form__cell">
				<AddStaffDropdown
					optionsId= {3}
					label='Speaking lvl:'
					value={staffSpeak}
					placeholder='Select speaking lvl'
					handleChange={(e: { value: React.SetStateAction<string>; }) => setStaffSpeak(e.value)} />
			</div>

			<div className="form__cell">
				<label htmlFor="time">Weekly Allowed Time:</label>
				<input
					name="time"
					className="form__input"
					min={0}
					type="number"
					value={allowedTime}
					onChange={(e) => {setAllowedTime(+e.target.value)}} />
			</div>

			<div className="form__cell form__cell--btns">
				<Button
					classname="tab__btn"
					label="Save"
					handleClick={(e) => saveEdit(e)} />
				<Button
					classname="tab__btn tab__btn--red"
					label="Cancel"
					handleClick={(e) => cancelEdit(e)} />
			</div>
		</form>
	)
}