import { allOptions } from "../data/DropdownOptions";


export default function initOptions () {
	localStorage.options = JSON.stringify(allOptions);
}