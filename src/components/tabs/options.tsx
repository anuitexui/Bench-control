
import { useState } from "react";
import OptionsForm from "../optionsForm";
import getOptions from "../../utils/getOptions";

export default function Options(){

	const [optionsPosition, setOptionsPosition] = useState(getOptions(0));
	const [optionsStack, setOptionsStack] = useState(getOptions(1));
	
	return <div className="tab__body">
	<h2>Employees options</h2>
	<OptionsForm setOptionsList={setOptionsPosition} optionId={0} optionName="Position" />
	<OptionsForm setOptionsList={setOptionsStack} optionId={1} optionName="Stack" />
</div>;
}