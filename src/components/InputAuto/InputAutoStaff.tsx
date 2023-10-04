import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { EmployeesProps } from "../../data/Employees";
import { ProjectStaffProps } from "../../data/Projects";

import "./InputAutoStaff.scss";

interface InputAutoStaffProps {
  label: string;
  pholder: string;
  classname: string;
  data: Array<EmployeesProps>;
  onSelected: any;
  currentData?: Array<ProjectStaffProps>;
  clear?: boolean;
  setClear?: (clear: boolean) => void;
  defaultValue?: string;
}

export default function InputAutoStaff({
  label,
  pholder,
  classname,
  data,
  onSelected,
  currentData,
  clear,
  setClear,
  defaultValue,
}: InputAutoStaffProps) {
  const [suggestions, setSugesstions] = useState<Array<string>>([]);
  const [isHideSuggs, setIsHideSuggs] = useState(false);
  const [selectedVal, setSelectedVal] = useState(
    defaultValue ? defaultValue : ""
  );

  const clickOut = (e: { target: any }) => {
    if (!e.target.classList.contains(classname)) {
      setIsHideSuggs(false);
      document.removeEventListener("click", clickOut);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setClear) {
      setClear(false);
    }
    const input = e.target.value;
    setIsHideSuggs(true);
    setSelectedVal(input);

    document.addEventListener("click", clickOut);
    let newData: Array<EmployeesProps> = data;
    if (currentData && currentData.length) {
      for (let i = 0; currentData.length > i; i++) {
        newData = newData.filter((employ) => employ.id !== currentData[i]!.id);
      }
    }
    const newsuggest: Array<string> = [];
    newData.forEach((i) => {
      if (i.name.toLowerCase().indexOf(input.toLowerCase()) == -1) {
        return;
      } else {
        newsuggest.push(i.name);
      }
    });
    setSugesstions(newsuggest);
  };

  const hideSuggs = (value: SetStateAction<string>) => {
    onSelected(value);
    setSelectedVal(value);
    setIsHideSuggs(false);
  };

  return (
    <div className="form__input-auto">
      <div className="form__input-auto-body">
        <label htmlFor="tag-input">{label}</label>
        <input
          placeholder={pholder}
          className={classname}
          type="search"
          value={clear ? "" : selectedVal}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div
        className="form__input-auto-suggestions"
        style={{
          display: isHideSuggs && suggestions.length ? "block" : "none",
        }}
      >
        {suggestions.map((item, idx) => (
          <div
            key={"" + item + idx}
            onClick={() => {
              hideSuggs(item);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
