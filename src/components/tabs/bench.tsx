import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import BenchTable from "../BenchTable/BenchTable";
import getEmployees from "../../utils/GetEmployees";
import { EmployeesProps } from "../../data/Employees";

import "./Bench.scss";


export default function Bench() {
  const staff = getEmployees();

  const [staffList, setStaffList] = useState(staff);
  const [zone, setZone] = useState("");
  const [nameSearch, setNameSearch] = useState("");


  const zones = [
    { value: "0", label: "all zones" },
    { value: "1", label: "red" },
    { value: "2", label: "yellow" },
    { value: "3", label: "green" },
    { value: "4", label: "grey" },
  ];

  const nameFilter = () => {};
  useEffect(() => {
    const filteredStaffList: Array<EmployeesProps> = [];
    staff.forEach((employ) => {
      if (employ.name.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1) {
        return;
    } else {filteredStaffList.push(employ)}
    });
    setStaffList(filteredStaffList);
  }, [nameSearch]);

  return (
    <div className="tab__body tab__bench">
      <div className="tab__actions">
        <div className="tab__actions-search">
          <span className="tab__actions-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
            </svg>
          </span>
          <input
            type="text"
            className="form__input"
            placeholder="Name"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
          />
        </div>
        <div className="tab__actions-dropdown">
          <Dropdown
            options={zones}
            value={zone}
            placeholder="Choose by warning zone"
            className="dropdown"
            arrowClosed={<span className="dropdown__arrow-closed" />}
            arrowOpen={<span className="dropdown__arrow-open" />}
            controlClassName="dropdown__button"
            menuClassName="dropdown__list"
            placeholderClassName="dropdown__placeholder"
            onChange={(e) => setZone(e.value)}
          />
        </div>
      </div>
      <div className="tab__table">
        <BenchTable staffList={staffList} />
      </div>
    </div>
  );
}
