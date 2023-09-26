import { EmployeesProps, employees } from "../data/employees";

export default function getEmplyees(): Array<EmployeesProps> {
	const employeesList = employees;
	return employeesList;
}