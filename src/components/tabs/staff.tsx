import { useState } from "react";
import Button from "../button";
import AddStaffForm from "../addStaffForm";
import EmployeeTable from "../employeesTable";
import { EmployeesProps } from "../../data/employees";
import EditStaffForm from "../editStaffForm";
import RemoveConfirm from "../removeConfirm";
import getEmployees from "../../utils/getEmployees";

export default function Staff(){
    const [isAddFormOpen, setIsAddFormOpen] = useState<boolean>(false);
    const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
    const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState<boolean>(false);
    const [employeesList, setEmployeesList] = useState<Array<EmployeesProps>>(getEmployees);
    const [employeeEditId, setEmployeeEditId] = useState<number>(0);
    const [employRemoveId, setemployRemoveId] = useState<number>(0);

    function addFormToggle() {
        setIsAddFormOpen(!isAddFormOpen);
    }

    function editFormToggle(id: number) {
        setIsEditFormOpen(!isEditFormOpen);
        setEmployeeEditId(id);
    }

    function removeConfirmToggle(id: number) {
        setIsRemoveConfirmOpen(!isRemoveConfirmOpen);
        setemployRemoveId(id);
    }

    interface IsFormShownProps {
        isFormShown: boolean,
    }

    function ShowAddForm({isFormShown}: IsFormShownProps): JSX.Element | null{
        const isAddFormShown = isFormShown;
        if (isAddFormShown) {            
            return <AddStaffForm 
                employeesList={employeesList} 
                setEmployeesList={setEmployeesList} 
                closeForm={() => setIsAddFormOpen(false)} />
        } return null
    }

    function ShowEditForm({isFormShown}: IsFormShownProps): JSX.Element | null {
        const isEditFormShown = isFormShown;
        if (isEditFormShown) {
            return <EditStaffForm 
                employeesList={employeesList} 
                id={employeeEditId} 
                cancelEdit={() => setIsEditFormOpen(false)} 
                setEmployeesList={setEmployeesList}
                isFormOpen={setIsEditFormOpen} />
        } return null
    }

    function ShowRemoveConfirm({isFormShown}: IsFormShownProps): JSX.Element | null {
        const isRemoveConfirmShown = isFormShown;
        if (isRemoveConfirmShown) {
            return <RemoveConfirm 
                    id={employRemoveId} 
                    employeesList={employeesList} 
                    closeConfirm={() => setIsRemoveConfirmOpen(false)} 
                    removeEmploy={() => employRemove(employRemoveId)} />;
        } return null
    }

    function employRemove(id: number) {
        setIsRemoveConfirmOpen(false);
        setEmployeesList(
            employeesList.filter(employ =>
                employ.id !== id
            )
        );
    }

    return <div className="tab__body">
        <Button
            classname={isAddFormOpen ? "tab__btn tab__btn--close tab__btn--red" : "tab__btn tab__btn--add"}
            label={isAddFormOpen? "X" : "Add"}
            handleClick={addFormToggle} />
        <ShowAddForm isFormShown={isAddFormOpen} />
        <EmployeeTable
            employeesList={employeesList}
            employId={editFormToggle}
            employRemove={removeConfirmToggle} />
        <ShowEditForm isFormShown={isEditFormOpen}/>
        <ShowRemoveConfirm isFormShown={isRemoveConfirmOpen} />
    </div>
}