import React from "react";
import Button from "./button";
import { EmployeesProps } from "data/employees";

interface ConfirmProps {
	id: number,
	employeesList: Array<EmployeesProps>,
	closeConfirm: React.MouseEventHandler<HTMLButtonElement>,
	removeEmploy: React.MouseEventHandler<HTMLButtonElement>,
}

export default function RemoveConfirm({id, employeesList, closeConfirm, removeEmploy}: ConfirmProps): JSX.Element {
	let employ = employeesList.find(employee => employee.id == id);

	return (
		<div className="confirm-form">
			<div className="confirm-form__backdrop"></div>
			<div className="confirm-form__body">
				<p className="confirm-form__text">Remove <b>{employ? employ.name : ''}</b> ?</p>
				<div className="confirm-form__buttons">
					<Button
						classname="tab__btn confirm-form__btn tab__btn--red"
						label='Remove'
						handleClick={removeEmploy} />
					<Button
						classname="tab__btn confirm-form__btn"
						label='Cancel'
						handleClick={closeConfirm} />
				</div>
			</div>
		</div>
)}