import OptionsForm from "../OptionsForm/OptionsForm";

import "./Options.scss";

export default function Options() {
  return (
    <div className="tab__body">
      <h2 className="tab__title">Employees options</h2>
      <OptionsForm optionName="roles" optionTitle="Position:" />
      <OptionsForm optionName="stacks" optionTitle="Stack:" />
      <OptionsForm optionName="exps" optionTitle="Experience:" />
      <OptionsForm optionName="speakLvl" optionTitle="Speaking lvl:" />
    </div>
  );
}
