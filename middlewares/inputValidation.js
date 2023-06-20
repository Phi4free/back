const Tradutor = require("../tradutor");

function isUserPopulated(object) {
    const requiredProperties = ["nome", "email", "senha"];

    for (const property of requiredProperties) {
        if (!(property in object)) {
            return {
                message: Tradutor.t("missingProperty") + ` '${property}'`,
                status: 400,
            };
        }
    }

    const propertyWithNullUndefined = Object.keys(object).find(
        (propertyName) =>
            object[propertyName] === null || object[propertyName] === undefined
    );

    if (propertyWithNullUndefined) {
        return {
            message:
                Tradutor.t("property") +
                ` '${propertyWithNullUndefined}' ` +
                Tradutor.t("cannotNull"),
            status: 400,
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
                message: Tradutor.t("missingProperty") + `: '${property}'`,
                status: 400,
            };
        }
    }

    const propertyWithNullUndefined = Object.keys(object).find(
        (propertyName) =>
            object[propertyName] === null || object[propertyName] === undefined
    );

    if (propertyWithNullUndefined) {
        return {
            message:
                Tradutor.t("property") +
                ` '${propertyWithNullUndefined}' ` +
                Tradutor.t("cannotNull"),
            status: 400,
        };
    } else {
        return;
    }
}

function charLimit(object) {
    const minLimit = 4;
    const maxLimit = 50;
    const propertyOffLimit = Object.keys(object).find(
        (propertyName) =>
            typeof object[propertyName] === "string" &&
            (object[propertyName].length < minLimit ||
                object[propertyName].length > maxLimit)
    );

    if (propertyOffLimit) {
        return {
            message:
                Tradutor.t("property") +
                ` '${propertyOffLimit}' ` +
                Tradutor.t("mustOver") +
                ` ${minLimit} ` +
                Tradutor.t("mustUnder") +
                ` ${maxLimit} ` +
                Tradutor.t("characters"),
            status: 400,
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
        return { message: Tradutor.t("invalidEmail"), status: 400 };
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
        return { message: Tradutor.t("weakPassword"), status: 400 };
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

module.exports = {
    isUserPopulated,
    charLimit,
    hasValidEmail,
    hasStrongPassword,
    isLoginPopulated,
    runValidationTests,
};
