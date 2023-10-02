import React from "react";
import Button from "../Button/Button";

import "./RemoveConfirm.scss";

interface ConfirmProps {
  name: string,
  cancel: React.MouseEventHandler<HTMLButtonElement>;
  remove: React.MouseEventHandler<HTMLButtonElement>;
}

export default function RemoveConfirm({
  name,
  cancel,
  remove,
}: ConfirmProps): JSX.Element {

  return (
    <div className="confirm-form">
      <div className="confirm-form__backdrop"></div>
      <div className="confirm-form__body">
        <p className="confirm-form__text">
          Remove <b>{name}</b> ?
        </p>
        <div className="confirm-form__buttons">
          <Button
            classname="tab__btn confirm-form__btn tab__btn--red"
            label="Remove"
            handleClick={remove}
          />
          <Button
            classname="tab__btn confirm-form__btn"
            label="Cancel"
            handleClick={cancel}
          />
        </div>
      </div>
    </div>
  );
}
