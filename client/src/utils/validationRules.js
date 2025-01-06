const ValidationRules = {
  // Validation Rules for Login
  validateLogin(values) {
    let errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  },

  // Validation Rules for Registration
  validateRegister(values) {
    let errors = {};

    if (!values.username) {
      errors.username = "Username is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  },

  // Validation Rules for New Passwords
  validatePassword(values) {
    let errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.username) {
      errors.username = "Username is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  },

  // Validation Rules for New Secret notes
  validateSecretNote(values) {
    let errors = {};

    if (!values.title) {
      errors.title = "Title is required";
    }

    if (!values.content) {
      errors.content = "Content is required";
    }

    return errors;
  },

  // Validation Rules for New Folders
  validateFolder(values) {
    let errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    return errors;
  },
};

export default ValidationRules;
