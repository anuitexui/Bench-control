import { ChangeEvent, SetStateAction, useState } from "react";
import { EmployeesProps } from "../../data/Employees";
import { ProjectProps, ProjectStaffProps } from "../../data/Projects";
import getStaffProjectsTime from "../../utils/GetStaffProjectsTime";

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
  projects?: Array<ProjectProps>,
  setFreeTime?: (time: number) => void,
  setMaxFreeTime?: (time: number) => void, 
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
  projects,
  setFreeTime,
  setMaxFreeTime,
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
  
  let newData: Array<EmployeesProps> = data;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setClear) {
      setClear(false);
    }
    const input = e.target.value;
    setIsHideSuggs(true);
    setSelectedVal(input);

    document.addEventListener("click", clickOut);
    
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

    if (projects?.length && setFreeTime && setMaxFreeTime) {
      const employ = newData.filter((employ) => employ.name == value)[0];
      const id = employ ? employ.id : 0;
      const time = employ ? employ.time : 0;
      const freeTime = time - getStaffProjectsTime(id, projects, "B");
      setFreeTime(freeTime);
      setMaxFreeTime(freeTime);
      console.log(freeTime);
    }
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
