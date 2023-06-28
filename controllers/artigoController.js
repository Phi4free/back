const Tradutor = require("../tradutor");
const {
    dbCreateArticle,
    dbReadArticle,
    dbListArticles,
    dbUpdateArticle,
    dbDeleteArticle,
    dbListArticlesByAuthor,
} = require("./dbController");

module.exports.criarArtigoGet = (request, response) => {
    if (false) {
        //request.session.user.isUserValid()
        response.redirect("/criarArtigo");
    } else {
        response.send(
            Tradutor.t('article403')
        );
    }
};

module.exports.criarArtigoPost = async (request, response, next) => {
    //const user = request.session.user;
    const artigo = request.body;
    artigo.autorId = request.user._id;
    //dbCreateArticle(user, artigo);
    try {
        const result = await dbCreateArticle(artigo);
        response
            .status(result.status)
            .send({ message: result.message, data: result.savedArticle });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: Tradutor.t("error") });
    }
};

module.exports.lerArtigoGet = async (request, response) => {
    const id = request.query.id;
    try {
        const result = await dbReadArticle(id);
        response
            .status(result.status)
            .send({ message: result.message, data: result.data });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: Tradutor.t("error") });
    }
};

module.exports.listaArtigosGet = async (request, response) => {
    try {
        const result = await dbListArticles();
        response
            .status(result.status)
            .send({ message: result.message, data: result.data });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: Tradutor.t("error") });
    }
};

module.exports.listaArtigosAutorGet = async (request, response) => {
    const body = request.body
    try {
        const result = await dbListArticlesByAuthor(body._id);
        response
            .status(result.status)
            .send({ message: result.message, data: result.data });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: Tradutor.t("error") });
    }
};

module.exports.updateArtigoPut = async (request, response, next) => {
    const artigo = request.body;
    //artigo.autorId = request.id;
    try {
        const result = await dbUpdateArticle(artigo);
        response
            .status(result.status)
            .send({ message: result.message, data: result.updatedArticle });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: Tradutor.t("error") });
    }
};

module.exports.excluirArtigoDelete = async (request, response, next) => {
    const id = request.params.id;
    try {
        const result = await dbDeleteArticle(id);
        response
            .status(result.status)
            .send({ message: result.message, data: result.deletedCount });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: Tradutor.t("error") });
    }
};
