const Login = require("../models/loginModel");
const util = require("util");
const {
    isLoginPopulated,
    charLimit,
    hasValidEmail,
    runValidationTests,
} = require("../middlewares/inputValidation");
const Tradutor = require("../tradutor");

module.exports.authUser = async (request, response) => {
    let login = new Login(request.user || request.body);

    const tests = [isLoginPopulated, charLimit, hasValidEmail];

    const validationResult = runValidationTests(login, tests);
    if (validationResult) {
        return response
            .status(validationResult.status)
            .send({ message: validationResult.message });
    }

    try {
        //console.log('Login request: ' + util.inspect(request.body));
        const tokenObject = await login.getToken();
        response
            .status(tokenObject.status)
            .send({
                auth: tokenObject.auth,
                username: tokenObject.username,
                token: tokenObject.token,
                userId: tokenObject.userId,
                message: tokenObject.message
            });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: Tradutor.t("error") });
    }
};
