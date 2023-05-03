const { request, response } = require("express");
const { 
    dbCreateArticle,
    dbReadArticle,
    dbListArticles,
    dbUpdateArticle,
    dbDeleteArticle
  } = require('./dbController');

  module.exports.criarArtigoGet = (request, response) => {

    if (false) { //request.session.user.isUserValid()
        response.redirect("/criarArtigo");
    } else {
        response.send("Sua conta atual não pode criar artigos. Entre em contato conosco para validar seu perfil como criador de conteúdo!");
    }
};

module.exports.criarArtigoPost = async (request, response, next) => {
    //const user = request.session.user;
    const artigo = request.body;
    artigo.autorId = request.id;
    //dbCreateArticle(user, artigo);
    response.send(await dbCreateArticle(artigo));
};

module.exports.lerArtigoGet = async (request, response) => {
    const id = request.query.id;
    response.send(await dbReadArticle(id));
};

module.exports.listaArtigosGet = async (request, response) => {
    response.send(await dbListArticles());
};

module.exports.updateArtigoPut = async (request, response, next) => {
    const artigo = request.body;
    //artigo.autorId = request.id;
    response.send(await dbUpdateArticle(artigo));
};

module.exports.excluirArtigoDelete = async (request, response, next) => {
    const id = request.params.id;
    response.send(await dbDeleteArticle(id));
};