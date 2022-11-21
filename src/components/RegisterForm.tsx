import React, { FormEvent, useRef, useState } from "react";

const RegisterForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [resultMessage, setResultMessage] = useState<string>("");
  const myForm = useRef<HTMLFormElement | null>(null);

  const handleCheckbox = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (myForm.current?.checkValidity()) {
      setResultMessage("Registered Successfully");
    } else {
      setResultMessage("Validation Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={myForm} noValidate>
      <label htmlFor="firstname">First name</label>
      <input type="text" id="firstname" name="firstname" required />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required />
      <input
        type="checkbox"
        id="newsletter"
        name="newsletter"
        onClick={handleCheckbox}
      />
      <label htmlFor="newsletter">Receive newsletter</label>
      {isChecked ? (
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
            required
          />
        </div>
      ) : null}
      <button type="submit">Submit</button>
      {resultMessage === "" ? null : <div>{resultMessage}</div>}
    </form>
  );
};

export default RegisterForm;
