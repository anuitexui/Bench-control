import OptionsForm from "../OptionsForm/OptionsForm";

export default function Options(){
	
	return <div className="tab__body">
	<h2>Employees options</h2>
	<OptionsForm optionName="roles" optionTitle="Position:" />
	<OptionsForm optionName="stacks" optionTitle="Stack:" />
	<OptionsForm optionName="exps" optionTitle="Experience:" />
	<OptionsForm optionName="speakLvl" optionTitle="Speaking lvl:" />
</div>;
}