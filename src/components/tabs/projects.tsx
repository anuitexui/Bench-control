import { useState } from "react";
import Button from "../Button/Button";
import AddProjectForm from "../AddProjectForm/AddProjectForm";

interface IsFormShownProps {
    isFormShown: boolean;
}

export default function Projects(){
    const [isAddFormOpen, setIsAddFormOpen] = useState<boolean>(false);

    function ShowAddForm(): JSX.Element | null {
        if (isAddFormOpen) {
          return (
            <AddProjectForm

              closeForm={() => setIsAddFormOpen(false)}
            />
          );
        }
        return null;
      }
    return <div className="tab__body">
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
</div>;
}