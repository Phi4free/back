const {
    dbCreateUser,
    dbReadUser,
    dbUpdateUser,
    dbDeleteUser,
} = require("./dbController");
const {
    isUserPopulated,
    charLimit,
    hasValidEmail,
    hasStrongPassword,
    runValidationTests,
} = require("../middlewares/inputValidation");
const Tradutor = require("../tradutor");

module.exports.verPerfilGet = async (request, response) => {
    id = request.query.id;
    try {
        const result = await dbReadUser(id);
        response
            .status(result.status)
            .send({ message: result.message, data: result.user });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: Tradutor.t("error") });
    }
};

module.exports.atualizarPerfilPut = async (request, response, next) => {
    const user = request.body;

    // Prevent non-administrators from changing the role
    if (user.role && request.user.role !== 'Administrator') {
        delete user.role;
    }

    const tests = [
        isUserPopulated,
        charLimit,
        hasValidEmail,
        hasStrongPassword,
    ];

    const validationResult = runValidationTests(user, tests);
    if (validationResult) {
        return response
            .status(validationResult.status)
            .send({ message: validationResult.message });
    }

    try {
        const result = await dbUpdateUser(user);
        response
            .status(result.status)
            .send({ message: result.message, data: result.updatedUser });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: Tradutor.t("error") });
    }
};

module.exports.criarPerfilPost = async (request, response, next) => {
    const user = request.body;

    const tests = [
        isUserPopulated,
        charLimit,
        hasValidEmail,
        hasStrongPassword,
    ];

    const validationResult = runValidationTests(user, tests);
    if (validationResult) {
        return response
            .status(validationResult.status)
            .send({ message: validationResult.message });
    }

    try {
        const result = await dbCreateUser(user);
        if (result.status != 200) {
            response.status(result.status).send({ message: result.message });
        } else {
            request.user = result.savedUserObject;
            next();
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: Tradutor.t("error") });
    }
};

module.exports.deletarPerfilDelete = async (request, response, next) => {
    id = request.params.id;
    try {
        const result = await dbDeleteUser(id);
        response
            .status(result.status)
            .send({ message: result.message, data: result.deletedCount });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: Tradutor.t("error") });
    }
};
