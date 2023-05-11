const { request, response } = require("express");
const { dbCreateUser, dbReadUser, dbUpdateUser, dbDeleteUser } = require("./dbController");

module.exports.verPerfilGet = async (request, response) => {
    id = request.query.id;
    response.send(await dbReadUser(id));
};

module.exports.atualizarPerfilPut = async (request, response, next) => {
    user = request.body;
    response.send(await dbUpdateUser(user));
};

module.exports.criarPerfilPost = async (request, response, next) => {
    user = request.body;
    const result = await dbCreateUser(user);
    request.user = result.savedUserObject;
    next();
  };

module.exports.deletarPerfilDelete = async (request, response, next) => {
    id = request.params.id;
    response.send(await dbDeleteUser(id));
};