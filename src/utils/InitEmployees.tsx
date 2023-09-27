import { employees } from "../data/Employees";

export default function initEmployees () {
	localStorage.staff = JSON.stringify(employees);
}