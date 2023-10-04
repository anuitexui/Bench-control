import { ProjectStaffProps } from "../../data/Projects";
import { ChangeEvent } from "react";
import ProjectStaffInputs from "../ProjectStaffInputs/ProjectStaffInputs";

import "./ProjectStaffEditList.scss";

interface ProjectStaffEditListProps {
  staffList: Array<ProjectStaffProps>;
	setStaffList : (list: Array<ProjectStaffProps>) => void;
}

export default function ProjectStaffEditList({
  staffList,
	setStaffList,
}: ProjectStaffEditListProps): JSX.Element {

	const remove = (id: number) => {
		setStaffList(staffList.filter((employ) => employ.id !== id));
	}

  const changeStaffType = (id: number, staffTypeB: boolean) => {
    setStaffList(staffList.map((employ) => {
      if (employ.id == id) {
        return {
          ...employ,
          billingType: staffTypeB ? "UB" : "B",
        };
      } else return employ;
    }));
  }

  const changeStaffTime = (id: number, newTime: number) => {
    setStaffList(staffList.map((employ) => {
      if (employ.id == id) {
        return {
          ...employ,
          time: newTime,
        };
      } else return employ;
    }));
  }
	
  return (
    <>
      {staffList.length ? (
        <div className="form__list--edit">
					<p className="form__list-row head">
						<span className="form__list-name head">Name:</span>
          	<span className="form__list-time head">h/Week:</span>
          	<span className="form__list-type head">TypeB</span>
					</p>
          
          {staffList.map((staff) => {
            return (
              <p className="form__list-row" key={staff.id}>
								<ProjectStaffInputs staff={staff} remove={remove} changeStaffType={changeStaffType} changeStaffTime={changeStaffTime} />
              </p>
            );
          })}
        </div>
      ) : (
        <p className="form__list-row">List is empty</p>
      )}
    </>
  );
}
