// import BenchTableRow from "../BenchTableRow/BenchtableRow";
// import { ProjectProps } from "../../data/Projects";
// import { StaffColorProps } from "components/Tabs/Bench";
import { StaffBenchListProps } from "../../utils/GetStaffBenchList";

import "./BenchTable.scss";

interface BenchTableProps {
  staffList: Array<StaffBenchListProps>;
}

export default function BenchTable({ staffList }: BenchTableProps) {
  const head = [
    "Name",
    "Position",
    "Project Count",
    "Stack",
    "Experience",
    "Speak Lvl",
    "Allowed Time",
    "Actual Free Time",
    "Unbillable Time",
    "Possible Free At",
  ];
  return (
    <table className="bench-table">
      <thead>
        <tr>
          {head.map((item) => {
            return <th key={item}>{item}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {staffList.length ? (
          staffList.map((staff) => {
            return (
              <tr key={staff.id} className="bench-table__row">
                <td>{staff.name}</td>
                <td>{staff.pos}</td>
                <td>{staff.projCount}</td>
                <td>{staff.stack}</td>
                <td>{staff.exp}</td>
                <td>{staff.speak}</td>
                <td>{staff.time}</td>
                <td>{staff.freeTime}</td>
                <td>{staff.ubTime}</td>
                <td className={`bench-table__cell ${staff.color}`}>
                  {staff.freeAt}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>
              <p className="bench-table__placeholder">List is Empty...</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
