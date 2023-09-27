import { useMemo } from "react";
import { Column, useTable } from "react-table"
import Button from "../Button/Button";
import { EmployeesProps } from "../../data/Employees";

import './EmployeesTable.scss';

interface TableProps {
	employeesList: Array<EmployeesProps>,
	employId: (arg: number) => void,
	employRemove: (arg: number) => void,
}

export default function EmployeesTable({employeesList, employId, employRemove}: TableProps) : JSX.Element {
	const data = employeesList;

	const columns: readonly Column<EmployeesProps>[] = useMemo(() => [
			{
				Header: "Name",
				accessor: "name",
			},
			{
				Header: "Position",
				accessor: "pos",
			},
			{
				Header: "Stack",
				accessor: "stack",
			},
			{
				Header: "Experince",
				accessor: "exp",
			},
			{
				Header: "Speaking Lvl",
				accessor: "speak",
			},
			{
				Header: "Weekly Allowed Time",
				accessor: "time",
			},
	], []);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data});

	return<div className="tab__table">
		<table {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th {...column.getHeaderProps()}>
								{column.render("Header")}
							</th>
						))}
						<th className="edit-cell"></th>
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row)
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => (
								<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
							))}
							<td className="edit-cell">
								<Button
									classname="tab__btn"
									label="Edit"
									handleClick={(e) => employId(row.original.id)} />
								<Button
									classname="tab__btn tab__btn--remove"
									label={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
										<path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/>
										</svg>}
									handleClick={(e) => employRemove(row.original.id)} />
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	</div>
}