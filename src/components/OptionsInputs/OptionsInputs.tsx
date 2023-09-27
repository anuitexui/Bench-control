import Button from "../Button/Button";
import { OptionsProps, allOptions } from "../../data/DropdownOptions";
import { useState } from "react";
import setOptions from "../../utils/SetOptions";

interface InputsProps {
  id: string;
  name: string;
  value: string;
	optionsList: Array<OptionsProps>;
	setOptionsList:(newOption: Array<OptionsProps>)=>void;
	optionName: string;
}

export default function InputsColumn({ id, name, value, optionsList, setOptionsList, optionName }: InputsProps) {
	const [newName, setNewName] = useState(name);
	const [newValue, setNewValue] = useState(value);
	const [isEdit, setIsEdit] = useState(true);
	const [isNameEmpty, setIsNameEmpty] = useState(false);
	const [isValueEmpty, setIsValueEmpty] = useState(false);

	function optionEdit() {
		if(!isEdit) {
			newValue? setIsValueEmpty(false): setIsValueEmpty(true);
			newName? setIsNameEmpty(false): setIsNameEmpty(true);
			if(newValue && newName) {
				const newOption = optionsList.map((option) => {
					if (option.id == +id) {
						return {
							...option,
							id: +id,
							value: newValue,
							name: newName,
							label: newValue
						};
					} else return option;
				});
				
				allOptions[optionName] = newOption;
				setOptions(allOptions);

				setOptionsList(newOption);
				setIsEdit(!isEdit);
			}        
		} else {setIsEdit(!isEdit);}
	}
	return (
		<>
			<div className="form__inputs-column">
				<label htmlFor="value">Value:</label>
				<input
					name="value"
					className={isValueEmpty? "form__input error": "form__input"}
					type="text"
					readOnly={isEdit}
					value={newValue}
					onChange={(e) => setNewValue(e.target.value)}
				/>
			</div>
			<div className="form__inputs-column">
				<label htmlFor="name">Description:</label>
				<input
					name="name"
					className={isNameEmpty? "form__input error": "form__input"}
					type="text"
					readOnly={isEdit}
					value={newName}
					onChange={(e) => setNewName(e.target.value)}
				/>
			</div>
			<Button 
						classname="tab__btn tab__btn--save"
						label={isEdit? "Edit": "Save"}
						handleClick={(e) => optionEdit()}
					/>
		</>
	);
}