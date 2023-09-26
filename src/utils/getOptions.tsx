import { OptionsProps, allOptions } from "../data/dropdownOptions";

export default function getOptions(querryOpions: number): Array<OptionsProps> {
	const arrOptions = allOptions;
	const options = arrOptions[querryOpions];
	if (options) {
		return options;
	} return [];
}