export const validate = (formData, setFormErrors) => {
  const err = {};

  if (formData.firstName.trim() === "") {
    err.firstName = "You need to enter a first name";
  } else if (formData.firstName.trim().length < 2) {
    err.firstName = "Your name must be atleast 2 chars long";
  }

  if (formData.lastName.trim() === "") {
    err.lastName = "You need to enter a last name";
  } else if (formData.lastName.trim().length < 2) {
    err.lastName = "Your name must be atleast 2 chars long";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (formData.email.trim() === "") {
    err.email = "You need to enter an email address";
  } else if (!emailRegex.test(formData.email)) {
    err.email = "Email not valid!";
  }

  if (formData.message.trim() === "") {
    err.message = "Your need to enter a valid message";
  } else if (formData.message.trim().length < 2) {
    err.message = "Your message must be atleast 2 chars long";
  }

  setFormErrors(err);

  const errorsArray = Object.keys(err);
  const lengthOfArray = errorsArray.length;
  let returnValue;
  if (lengthOfArray < 1) {
    returnValue = true;
  } else {
    returnValue = false;
  }

  return returnValue;
};

export const validateRegister = (formData, setFormErrors) => {
  const err = {};

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (formData.email.trim() === "") {
    err.email = "You need to enter an email address";
  } else if (!emailRegex.test(formData.email)) {
    err.email = "Email not valid!";
  }

  if (formData.password.trim() === "") {
    err.password = "You need to enter a password";
  } else if (formData.password.trim().length < 6) {
    err.password = "Your password must be at least 6 characters long";
  }

  if (formData.confirmPassword.trim() === "") {
    err.confirmPassword = "You need to confirm your password";
  } else if (formData.confirmPassword !== formData.password) {
    err.confirmPassword = "Passwords do not match";
  }

  setFormErrors(err);

  const errorsArray = Object.keys(err);
  const lengthOfArray = errorsArray.length;
  let returnValue;

  if (lengthOfArray < 1) {
    returnValue = true;
  } else {
    returnValue = false;
  }

  return returnValue;
};
