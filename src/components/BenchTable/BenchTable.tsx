import { EmployeesProps } from "../../data/Employees"

import "./BenchTable.scss";

interface BenchTableProps {
	staffList: Array<EmployeesProps>
}

export default function BenchTable ({staffList}: BenchTableProps) {
	const head = [
		"Name",
		"Position",
		"Stack",
		"Experience",
		"Speak Lvl",
		"Allowed Time",
	]
	return (
		<table className="bench-table">
			<thead>
				<tr>
					{head.map((item) => {
						return(
							<th key={item}>
								{item}
							</th>
						)
					})}
				</tr>
			</thead>

					<tbody>
						{staffList.length ? (staffList.map((staff) => {
						return (
							<tr key={staff.id}>
								<td>{staff.name}</td>
								<td>{staff.pos}</td>
								<td>{staff.stack}</td>
								<td>{staff.exp}</td>
								<td>{staff.speak}</td>
								<td>{staff.time}</td>
							</tr>
						)
					})) : (
						<p className="bench-table__placeholder">List is Empty...</p>
					)}
					
				</tbody>


		</table>
	)
}