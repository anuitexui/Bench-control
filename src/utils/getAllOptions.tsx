import { useState } from "react";
import { OptionsProps, allOptions } from "../data/dropdownOptions";

export function getAllOptions(): Array<Array<OptionsProps>> {
const [ alloptions, setAlloptions ] = useState(allOptions);
//  const allOptionsCurrentList = allOptionsList;
//  const setAllOptionsCurrentList = setAllOptionsList;
	// const alloptions = allOptions;

	return alloptions;
}


