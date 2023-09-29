import { ChangeEvent, SetStateAction, useState } from "react";
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
  clear?: any;
}

export default function InputAutoStaff({
  label,
  pholder,
  classname,
  data,
  onSelected,
  currentData,
  clear,
}: InputAutoStaffProps) {
  const [suggestions, setSugesstions] = useState<Array<string>>([]);
  const [isHideSuggs, setIsHideSuggs] = useState(false);
  const [selectedVal, setSelectedVal] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setIsHideSuggs(true);
    setSelectedVal(input);
    
    let newData: Array<EmployeesProps> = data;
    if (currentData && currentData.length) {
      for (let i = 0; currentData.length > i; i++ ) {
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

  clear = () => {
    setSelectedVal("");
  } 

  return (
    <div className="form__input-auto">
      <div className="form__input-auto-body">
        <label htmlFor="tag-input">{label}</label>
        <input
          placeholder={pholder}
          className={classname}
          type="search"
          value={selectedVal}
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
