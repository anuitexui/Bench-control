import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import BenchTable from "../BenchTable/BenchTable";
import GetStaffBenchList, { StaffBenchListProps } from "../../utils/GetStaffBenchList";
import Button from "../Button/Button";
import Tooltips from "../Tooltips/Tooltips";

import "./Bench.scss";

export default function Bench() {

  const staffColor: Array<StaffBenchListProps> = GetStaffBenchList();
  
  const [staffList, setStaffList] = useState< Array<StaffBenchListProps>>(staffColor);
  const [staffColorFiltered, setStaffColorFiltered] = useState< Array<StaffBenchListProps>>(staffColor);
  const [colorZone, setColorZone] = useState("all");
  const [nameSearch, setNameSearch] = useState("");
  const [isTipOpen, setIsTipOpen] = useState<boolean>(false);
  const [btnPosition, setBtnPostion] = useState<number>(0);

  const zones = [
    { value: "all", label: "all zones", className: "dropdown__option dropdown__option--all" },
    { value: "red", label: "red", className: "dropdown__option dropdown__option--red" },
    { value: "yellow", label: "yellow", className: "dropdown__option dropdown__option--yellow" },
    { value: "green", label: "green", className: "dropdown__option dropdown__option--green" },
    { value: "grey", label: "grey", className: "dropdown__option dropdown__option--grey" },
  ];

  useEffect(() => {
    const filteredStaffList: Array<StaffBenchListProps> = [];
    staffColorFiltered.forEach((employ) => {
      if (employ.name.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1) {
        return;
    } else {filteredStaffList.push(employ)}
    });
    setStaffList(() => filteredStaffList);    
  }, [nameSearch, staffColorFiltered]);

  useEffect(() => {
    if (colorZone == "all") setStaffColorFiltered(() => staffColor);
    else {
      setStaffColorFiltered(() => staffColor.filter((staff) => staff.color == colorZone))
    }
  }, [colorZone]);

  const openTooltip = (e: any) => {
    e.preventDefault();
    setBtnPostion(e.target.getBoundingClientRect().right);
    setIsTipOpen(true);
  };

  const closeTip = () => {
    setIsTipOpen(false);
  };

  const ShowTooltip = () => {
    if (isTipOpen) {
      return (
        <Tooltips
          closeTip={closeTip}
          btnPosition={btnPosition}
          children={
            <>
              <p><span>red</span> - less than 2 week</p>
              <p><span>yellow</span> - less than month</p>
              <p><span>green</span> - more than month</p>
              <p><span>grey</span> - no active prject</p>
            </>
          }
        />
      );
    } else return null;
  };

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
        <Button
        classname="form__tip-btn"
        label="?"
        handleClick={(e) => openTooltip(e)}
      />
          <Dropdown
            options={zones}
            value={colorZone}
            placeholder="Choose by warning zone"
            className="dropdown"
            arrowClosed={<span className="dropdown__arrow-closed" />}
            arrowOpen={<span className="dropdown__arrow-open" />}
            controlClassName="dropdown__button"
            menuClassName="dropdown__list"
            placeholderClassName="dropdown__placeholder"
            onChange={(e) => setColorZone(e.value)}
          />
          <ShowTooltip />
        </div>
      </div>
      <div className="tab__table">
        <BenchTable staffList={staffList} />
      </div>
    </div>
  );
}
