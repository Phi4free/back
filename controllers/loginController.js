const { response } = require("express");
const Login = require("../models/loginModel");

module.exports.authUser = async (request, response) => {
    let login = new Login(request.user || request.body);
    response.send(await login.getToken())
}