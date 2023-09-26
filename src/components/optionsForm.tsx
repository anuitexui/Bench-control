import { ChangeEvent, MouseEvent, useState } from "react";
import getOptions from "../utils/getOptions";
import Button from "./button";
import { OptionsProps } from "data/dropdownOptions";

interface OptionsFormProps {
	optionId: number;
	optionName: string;
	setOptionsList:(optionsList: Array<OptionsProps>) => void,
}

export default function OptionsForm({ optionId, optionName, setOptionsList }: OptionsFormProps): JSX.Element {
	const optionsList = getOptions(optionId);

	const [optionsCurrent, setOptionsCurrent] = useState(optionsList);
	
	function changeName(e: ChangeEvent<HTMLInputElement>) {
		const newOptions = [...optionsCurrent];
		const id:number = +e.target.id - 1;

		newOptions[id]!.name = e.target.value;
		setOptionsCurrent(newOptions);			
	}

	function changeValue(e: ChangeEvent<HTMLInputElement>) {
		const newOptions = [...optionsCurrent];
		const id:number = +e.target.id - 1;
		
		newOptions[id]!.value = e.target.value;
		newOptions[id]!.label = e.target.value;
		setOptionsCurrent(newOptions);
		console.log(optionsCurrent);
		
	}

	function saveOption(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void  {
		e.preventDefault();

		// const editedOptions = allOptionsList.map(options => {
		// 	if (options.id == optionId) {
		// 		return {
		// 			...optionsCurrent,
		// 			// name : staffname,
		// 			// pos : staffRole,
		// 			// stack : staffStack,
		// 			// exp : staffExp,
		// 			// speak : staffSpeak,
		// 			// time : allowedTime,
		// 		}
		// 	} else return option;
		// });

		// const editedOptions = { ...allOptionsList, allOptionsList[optionId]{},}

		setOptionsList(optionsCurrent);
	}

	return <form className="tab__form form"> 
		<h2 className="form__title">{optionName}</h2>
		<div className="form__option">
			{optionsCurrent.map(option => {
				return (
					<div className="form__inputs" key={option.id}>
						<label htmlFor="name">Name:</label>
						<input id={option.id.toString()} name="name" className="form__input" type="text" value={option.name} onChange={(e) => changeName(e)} />
						<label htmlFor="value">Value:</label>
						<input id={option.id.toString()} name="value" className="form__input" type="text" value={option.value} onChange={(e) => changeValue(e)} />
					</div>
				)
			})}
		</div>
		<Button classname="tab__btn" label="Save" handleClick={(e) => saveOption(e)} />
	</form>
}