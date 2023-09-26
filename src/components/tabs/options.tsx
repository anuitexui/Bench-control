import { useState } from "react";
import OptionsForm from "../optionsForm";

export default function Options(){

	function setOptionsPosition() {

	}
	function setOptionsStack() {
		
	}
	
	return <div className="tab__body">
	<h2>Employees options</h2>
	{/* <OptionsForm setOptionsList={setOptionsPosition} optionId={0} optionName="Position:" />
	<OptionsForm setOptionsList={setOptionsStack} optionId={1} optionName="Stack:" />
	<OptionsForm setOptionsList={setOptionsStack} optionId={2} optionName="Experience:" />
	<OptionsForm setOptionsList={setOptionsStack} optionId={3} optionName="Speaking lvl:" /> */}

	<OptionsForm optionId={0} optionName="Position:" />
	<OptionsForm optionId={1} optionName="Stack:" />
	<OptionsForm optionId={2} optionName="Experience:" />
	<OptionsForm optionId={3} optionName="Speaking lvl:" />
</div>;
}