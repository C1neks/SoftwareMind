import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import RegisterForm from "./RegisterForm";

describe("RegisterForm", () => {
  afterEach(cleanup);
  it("should renders empty form", () => {
    render(<RegisterForm />);
    const firstName = screen.getByText("First name");
    expect(firstName).toBeInTheDocument();
    const password = screen.getByText("Password");
    expect(password).toBeInTheDocument();
    const newsletterCheckbox = screen.getByText("Receive newsletter");
    expect(newsletterCheckbox).toBeInTheDocument();
    const emailField = screen.queryByText("Email");
    expect(emailField).not.toBeInTheDocument();
  });

  it("should render form with  email field after checkbox click", () => {
    render(<RegisterForm />);
    const newsLetterCheckbox = screen.getByText("Receive newsletter");
    const emailField = screen.queryByText("Email");
    expect(emailField).not.toBeInTheDocument();
    fireEvent.click(newsLetterCheckbox);
    const emailFieldAfterCheckbox = screen.queryByText("Email");
    expect(emailFieldAfterCheckbox).toBeInTheDocument();
  });

  it("should render validation error after submitting incorrect form", () => {
    render(<RegisterForm />);
    const submitButton = screen.getByText("Submit");

    fireEvent.click(submitButton);
    const validationErrorMessage = screen.getByText("Validation Error");
    expect(validationErrorMessage).toBeInTheDocument();
  });

  it("should render registered successfully after submitting correct form", () => {
    render(<RegisterForm />);
    const newsLetterCheckbox = screen.getByText("Receive newsletter");
    fireEvent.click(newsLetterCheckbox);
    const inputName = screen.getByLabelText("First name");
    fireEvent.change(inputName, { target: { value: "testname" } });
    const inputPassword = screen.getByLabelText("Password");
    fireEvent.change(inputPassword, { target: { value: "testpassword" } });
    const inputEmail = screen.getByLabelText("Email");
    fireEvent.change(inputEmail, { target: { value: "test@gmail.com" } });
    const submitButton = screen.getByText("Submit");

    fireEvent.click(submitButton);
    const validationErrorMessage = screen.getByText("Registered Successfully");
    expect(validationErrorMessage).toBeInTheDocument();
  });

  it("should render validation error after submitting form with incorrect email", () => {
    render(<RegisterForm />);
    const newsLetterCheckbox = screen.getByText("Receive newsletter");
    fireEvent.click(newsLetterCheckbox);
    const inputName = screen.getByLabelText("First name");
    fireEvent.change(inputName, { target: { value: "testname1" } });
    const inputPassword = screen.getByLabelText("Password");
    fireEvent.change(inputPassword, { target: { value: "testpassword1" } });
    const inputEmail = screen.getByLabelText("Email");
    fireEvent.change(inputEmail, { target: { value: "testemailgmail.com" } });
    const submitButton = screen.getByText("Submit");

    fireEvent.click(submitButton);
    const validationErrorMessage = screen.getByText("Validation Error");
    expect(validationErrorMessage).toBeInTheDocument();
  });
});
