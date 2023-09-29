import { useState } from "react";
import setOptions from "../../utils/SetOptions";
import getAllOptions from "../../utils/GetAllOptions";
import Button from "../Button/Button";
import OptionsInputs from "../OptionsInputs/OptionsInputs";
import { OptionsProps } from "data/DropdownOptions";

import "./OptionsForm.scss";


interface OptionsFormProps {
  optionName: string;
  optionTitle: string;
}

export default function OptionsForm({
  optionName,
  optionTitle,
}: OptionsFormProps) {
  const allOptions = getAllOptions();
  const currentOptionsList = allOptions[optionName] || [] ;

  const [optionsList, setOptionsList] = useState<Array<OptionsProps>>(currentOptionsList);
  const [addName, setAddName] = useState<string>("");
  const [addValue, setAddValue] = useState<string>("");
  const [isAddNameEmpty, setIsAddNameEmpty] = useState<boolean>(false);
  const [isAddValueEmpty, setIsAddValueEmpty] = useState<boolean>(false);
  const [isOptionShown, setIsOptionShown] = useState<boolean>(true);

  function optionRemove(id: number) {
    let newOption = optionsList.filter((option) => option.id !== id);

    allOptions[optionName] = newOption;
    setOptions(allOptions);

    setOptionsList(newOption);
  }

  function optionAdd() {
    addValue ? setIsAddValueEmpty(false) : setIsAddValueEmpty(true);
    addName ? setIsAddNameEmpty(false) : setIsAddNameEmpty(true);
    if (addName && addValue) {
      //new options ID
      let ids: Array<number> = [];
      for (let option of optionsList) {
        ids.push(option.id);
      }
      let newId = Math.max.apply(null, ids) + 1;
      let newOption = [
        ...optionsList,
        {
          id: newId,
          name: addName,
          label: addValue,
          value: addValue,
        },
      ];

      allOptions[optionName] = newOption;
      setOptions(allOptions);
      setOptionsList(newOption);
      setAddName("");
      setAddValue("");
    }
  }

  // function optionSave(e: any) {
  //   let form = e.target.form;
  //   //clear errors
  //   e.target.form.name.forEach(
  //     (input: { classList: { remove: (arg0: string) => void } }) => {
  //       input.classList.remove("error");
  //     }
  //   );
  //   e.target.form.value.forEach(
  //     (input: { classList: { remove: (arg0: string) => void } }) => {
  //       input.classList.remove("error");
  //     }
  //   );

  //   let isError = false;

  //   let newOptions: Array<OptionsProps> = [];
  //   for (let i = 0; i < form.name.length; i++) {
  //     if (form.name[i].value && form.value[i].value) {
  //       let option: OptionsProps = {
  //         id: i,
  //         name: form.name[i].value,
  //         value: form.value[i].value,
  //         label: form.value[i].value,
  //       };
  //       newOptions.push(option);
  //     } else if (form.name[i].value) {
  //       form.value[i].classList.add("error");
  //       isError = true;
  //     } else {
  //       form.name[i].classList.add("error");
  //       isError = true;
  //     }
  //   }
  //   if (!isError) {
  //     allOptions[optionName] = newOptions;
  //     setOptions(allOptions);
  //   } else {
  //     return null;
  //   }
  // }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="tab__form tab__form--options form"
    >
      <div className="form__top">
        <Button
          classname={isOptionShown ? "form__btn--hide" : "form__btn--show"}
          label={optionTitle}
          handleClick={() => setIsOptionShown(!isOptionShown)}
        />
      </div>
      <div className={isOptionShown ? "form__body" : "form__body hide"}>
        <div className="form__grid">
          {optionsList.map((option) => {
            return (
              <div className="form__inputs" key={option.id}>
                <OptionsInputs
                  id={option.id.toString()}
                  name={option.name}
                  value={option.value}
                  optionsList={optionsList}
                  setOptionsList={setOptionsList}
                  optionName={optionName}
                />
                <Button
                  classname="tab__btn tab__btn--remove"
                  label={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z" />
                    </svg>
                  }
                  handleClick={(e) => optionRemove(option.id)}
                />
              </div>
            );
          })}
        </div>
        <div className="form__inputs--add">
          <div className="form__inputs-column">
            <label htmlFor="new-name">Name:</label>
            <input
              name="new-name"
              placeholder="Name"
              className={isAddNameEmpty ? "form__input error" : "form__input"}
              type="text"
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
            />
          </div>
          <div className="form__inputs-column">
            <label htmlFor="new-value">Value:</label>
            <input
              name="new-value"
              placeholder="Value"
              className={isAddValueEmpty ? "form__input error" : "form__input"}
              type="text"
              value={addValue}
              onChange={(e) => setAddValue(e.target.value)}
            />
          </div>
          <Button classname="tab__btn" label="Add" handleClick={optionAdd} />
        </div>
      </div>
    </form>
  );
}
