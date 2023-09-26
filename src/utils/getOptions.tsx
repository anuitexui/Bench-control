import { OptionsProps, allOptions } from "../data/dropdownOptions";

export default function getOptions(querryOptions: number): Array<OptionsProps> {
	const arrOptions = allOptions;
	const options = arrOptions[querryOptions];
	if (options) {
		return options;
	} return [];
}