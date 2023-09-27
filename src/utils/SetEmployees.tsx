import { EmployeesProps } from "data/Employees";

export default function setEmployees (newEmployees:  Array<EmployeesProps>) {
	localStorage.staff = JSON.stringify(newEmployees);
}