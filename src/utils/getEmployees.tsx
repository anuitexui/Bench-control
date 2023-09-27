import { EmployeesProps, employees } from "../data/Employees";

export default function getEmplyees(): Array<EmployeesProps> {
	const employeesList = JSON.parse( localStorage.staff );
	return employeesList;
}