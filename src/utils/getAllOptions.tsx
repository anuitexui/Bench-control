import { AllOptionsProps } from "../data/DropdownOptions";

export default function getAllOptions(): AllOptionsProps {
  const allOptions = JSON.parse( localStorage.options );
  return allOptions;
}