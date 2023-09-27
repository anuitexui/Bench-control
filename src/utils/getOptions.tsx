import { OptionsProps } from "../data/DropdownOptions";
import getAllOptions from "./GetAllOptions";

export default function getOptions(querryOptions: string): Array<OptionsProps> {
  const allOptions = getAllOptions();
  const options = allOptions[querryOptions];

  if (options) {
    return options;
  }
  return [];
}
