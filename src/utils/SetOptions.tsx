import { AllOptionsProps } from "data/DropdownOptions";

export default function setOptions (newOptions: AllOptionsProps) {
	localStorage.options = JSON.stringify(newOptions);
}