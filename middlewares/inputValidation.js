function isUserPopulated(object) {
    const requiredProperties = ["nome", "email", "senha"];
  
    for (const property of requiredProperties) {
      if (!(property in object)) {
        return {
          message: `Missing required property '${property}'`,
          status: 400
        };
      }
    }
  
    const propertyWithNullUndefined = Object.keys(object).find(
      propertyName => object[propertyName] === null || object[propertyName] === undefined
    );
  
    if (propertyWithNullUndefined) {
      return {
        message: `Property '${propertyWithNullUndefined}' cannot have null or undefined value`,
        status: 400
      };
    } else {   
        return;
    }
}

function isLoginPopulated(object) {
    const requiredProperties = ["email", "senha"];
  
    for (const property of requiredProperties) {
      if (!(property in object)) {
        return {
          message: `Missing required property '${property}'`,
          status: 400
        };
      }
    }
  
    const propertyWithNullUndefined = Object.keys(object).find(
      propertyName => object[propertyName] === null || object[propertyName] === undefined
    );
  
    if (propertyWithNullUndefined) {
      return {
        message: `Property '${propertyWithNullUndefined}' cannot have null or undefined value`,
        status: 400
      };
    } else {   
        return;
    }
}
  
  
function charLimit(object) {
    const minLimit = 4;
    const maxLimit = 30;
    const propertyOffLimit = Object.keys(object).find(
      propertyName =>
        typeof object[propertyName] === 'string' && (object[propertyName].length < minLimit || object[propertyName].length > maxLimit)
    );
  
    if (propertyOffLimit) {
      return {
        message: `Property '${propertyOffLimit}' must be over ${minLimit} and under ${maxLimit} characters`,
        status: 400
      };
    } else {
        return;
    }
}

function hasValidEmail(object) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (emailRegex.test(object.email)) {
        return;
    } else {
      return { message: "Invalid email", status: 400 };
    }
}
  

function hasStrongPassword(object) {
    const password = object.senha;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()\-=_+[\]{}|\\;:'",.<>/?]/.test(password);
  
    if (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    ) {
        return;
    } else {
      return { message: "Weak password", status: 400 };
    }
}
  

function runValidationTests(object, tests) {
    for (const test of tests) {
      const result = test(object);
      if (result) {
        return result;
      }
    }
}
  
  
  

module.exports = { isUserPopulated, charLimit, hasValidEmail, hasStrongPassword, isLoginPopulated, runValidationTests };