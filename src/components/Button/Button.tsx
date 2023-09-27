import React from "react";

interface ButtonProps {
	disabled?: boolean;
	classname: string;
	handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
	label: any;
}

export default function Button({disabled, classname, handleClick, label} : ButtonProps): JSX.Element {
	return <button disabled={disabled} className={classname} onClick={handleClick}>{label}</button>
}