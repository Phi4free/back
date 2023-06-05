const {
    dbCreateUser,
    dbReadUser,
    dbUpdateUser,
    dbDeleteUser,
    dbUpdateUserEmail,
    dbUpdateUserPassword,
} = require("./dbController");
const {
    isUserPopulated,
    charLimit,
    hasValidEmail,
    hasStrongPassword,
    runValidationTests,
} = require("../middlewares/inputValidation");
const Tradutor = require("../tradutor");

module.exports.verMeuPerfilGet = async (request, response) => {
    let { nome, email, role } = request.user;
    response.status(200).send({ message: 200, data: { nome, email, role } });
};

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

// module.exports.atualizarEmailPut = async (request, response, next) => {
//     const user = request.body;
//     // Prevent non-administrators from changing the role
//     // TROCAR: O role não deve vir do front! E sim o id ser comparado no bd
//     if (user.role && request.user.role !== "Administrator") {
//         delete user.role;
//     }

//     const tests = [
//         isUserPopulated,
//         charLimit,
//         hasValidEmail,
//         hasStrongPassword,
//     ];

//     const validationResult = runValidationTests(user, tests);
//     if (validationResult) {
//         return response
//             .status(validationResult.status)
//             .send({ message: validationResult.message });
//     }

//     try {
//             const result = await dbUpdateUserEmail(user);
//         response
//             .status(result.status)
//             .send({ message: result.message, data: result.updatedUser });
//     } catch (error) {
//         console.log(error);
//         response.status(500).send({ message: Tradutor.t("error") });
//     }
// }

// module.exports.atualizarPerfilPut = async (request, response, next) => {
//     const user = request.body;
//     // Prevent non-administrators from changing the role
//     // TROCAR: O role não deve vir do front! E sim o id ser comparado no bd
//     if (user.role && request.user.role !== "Administrator") {
//         delete user.role;
//     }

//     const tests = [
//         isUserPopulated,
//         charLimit,
//         hasValidEmail,
//         hasStrongPassword,
//     ];

//     const validationResult = runValidationTests(user, tests);
//     if (validationResult) {
//         return response
//             .status(validationResult.status)
//             .send({ message: validationResult.message });
//     }

//     try {
//         let result = null;
//         if (user.email != null) {
//             result = await dbUpdateUserEmail(user);
//         } else if (user.senha != null) {
//             result = dbUpdateUserPassword(user);
//         } else {
//             result = await dbUpdateUser(user);
//         }
//         response
//             .status(result.status)
//             .send({ message: result.message, data: result.updatedUser });
//     } catch (error) {
//         console.log(error);
//         response.status(500).send({ message: Tradutor.t("error") });
//     }
// };

module.exports.atualizarEmailPut = async (request, response, next) => {
    const body = request.body;
    const user = request.user;
    //runValidation(response, user);
    const validationResult = runValidationTests(body, [hasValidEmail]);
    if(validationResult){
        response.status(400)
        .send(validationResult);
        next();
        return;
    }
    try {
        const result = await dbUpdateUserEmail(user._id, body.email);
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

function runValidation(response, user) {
    let result = false;
    const tests = [
        isUserPopulated,
        charLimit,
        hasValidEmail,
        hasStrongPassword,
    ];

    const validationResult = runValidationTests(user, tests);
    if (validationResult) {
        result = true;
        return response
            .status(validationResult.status)
            .send({ message: validationResult.message });
    }
}
