import { useState } from "react";
import Button from "../Button/Button";
import AddStaffForm from "../AddStaffForm/AddStaffForm";
import EmployeeTable from "../EmployeesTable/EmployeesTable";
import EditStaffForm from "../EditStaffForm/EditStaffForm";
import RemoveConfirm from "../RemoveConfirm/RemoveConfirm";
import getEmployees from "../../utils/GetEmployees";
import setEmployees from "../../utils/SetEmployees";

export default function Staff() {
  const [isAddFormOpen, setIsAddFormOpen] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] =
    useState<boolean>(false);
  const [employeeEditId, setEmployeeEditId] = useState<number>(0);
  const [employRemoveId, setemployRemoveId] = useState<number>(0);

  const employeesList = getEmployees();

  const editFormToggle = (id: number) => {
    setIsEditFormOpen(!isEditFormOpen);
    setEmployeeEditId(id);
  };

  const removeConfirmToggle = (id: number) => {
    setIsRemoveConfirmOpen(!isRemoveConfirmOpen);
    setemployRemoveId(id);
  };

  const ShowAddForm = (): JSX.Element | null => {
    if (isAddFormOpen) {
      return (
        <AddStaffForm
          employeesList={employeesList}
          closeForm={() => setIsAddFormOpen(false)}
        />
      );
    }
    return null;
  };

  function ShowEditForm(): JSX.Element | null {
    if (isEditFormOpen) {
      return (
        <EditStaffForm
          employeesList={employeesList}
          id={employeeEditId}
          cancelEdit={() => setIsEditFormOpen(false)}
          isFormOpen={setIsEditFormOpen}
        />
      );
    }
    return null;
  }

  function ShowRemoveConfirm(): JSX.Element | null {
    if (isRemoveConfirmOpen) {
      const employ = employeesList.find(
        (employee) => employee.id == employRemoveId
      );
      const currentName = employ ? employ.name : "";
      return (
        <RemoveConfirm
          name={currentName}
          cancel={() => setIsRemoveConfirmOpen(false)}
          remove={() => employRemove(employRemoveId)}
        />
      );
    }
    return null;
  }

  function employRemove(id: number) {
    setIsRemoveConfirmOpen(false);
    setEmployees(employeesList.filter((employ) => employ.id !== id));
  }

  return (
    <div className="tab__body">
      <Button
        classname={
          isAddFormOpen
            ? "tab__btn tab__btn--close tab__btn--red"
            : "tab__btn tab__btn--add"
        }
        label={isAddFormOpen ? "X" : "Add"}
        handleClick={() => setIsAddFormOpen(!isAddFormOpen)}
      />
      <ShowAddForm />
      <EmployeeTable
        employeesList={employeesList}
        employId={editFormToggle}
        employRemove={removeConfirmToggle}
      />
      <ShowEditForm />
      <ShowRemoveConfirm />
    </div>
  );
}
