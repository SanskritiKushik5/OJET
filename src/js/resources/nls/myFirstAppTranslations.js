define({
  // root bundle
  root: {
    inputs: {
      firstName: "First Name",
      lastName: "Last Name",
      fullName: "Full Name",
      weight: "Weight",
      birthday: "Birthday",
      age: "Age",
      country: "Country",
      state: "State",
    },
    validators: {
      firstNameLengthHint:
        "Custom hint: value must have at least {0} characters but not more than {1}",
      tooManyChars: "Too many characters",
      tooLong: "Number of characters is too high. Enter at most {0} characters",
      tooShort:
        "Number of characters is too low. Enter at least {0} characters",
    },
    messagesCustom: {
      weight: "You should have an higher value!",
      birthday: "You should have at least 18 years old!",
    },
    buttons: {
      create: "Create",
      reset: "Reset",
    },
  },

  // supported locales.
  "pt-PT": 1,
});
