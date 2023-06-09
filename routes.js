const express = require("express");
const route = express.Router();
const token = require("./middlewares/token");
const loginController = require("./controllers/loginController");
const { authorize } = require("./middlewares/permissions");

route.use(function (req, res, next) {
    Tradutor.selectedLanguage = req.headers?.language || "en";
    next();
});

route.get("/", function (req, res, next) {
    //var pass = req.body("password");
    //var loginx = req.body("login");
    //res.render('index.html', { title: 'Express' });
    res.redirect("/status");
    next;
});

route.get("/status", (request, response) => {
    response.send(
        JSON.stringify({
            status: "OK",
            message: "Parece estar funcionando.",
        })
    );
});

//CONTROLE E ROTEAMENTO DOS ARTIGOS
const artigoController = require("./controllers/artigoController");

route.get("/criarArtigo", artigoController.criarArtigoGet);

route.post(
    "/criarArtigo",
    token.verifyJWT,
    authorize("criarArtigo"),
    artigoController.criarArtigoPost
);

route.get("/lerArtigo/:query?", artigoController.lerArtigoGet);

route.get("/listaArtigos", artigoController.listaArtigosGet);

route.put(
    "/atualizarArtigo",
    token.verifyJWT,
    authorize("atualizarArtigo"),
    token.verifyAuthor,
    artigoController.updateArtigoPut
);

route.delete(
    "/excluirArtigo/:id",
    token.verifyJWT,
    authorize("excluirArtigo"),
    token.verifyAuthor,
    artigoController.excluirArtigoDelete
);

//CONTROLE E ROTEAMENTO DOS USUÁRIOS
const userController = require("./controllers/userController");
const { json } = require("body-parser");
const Tradutor = require("./tradutor");

route.get("/verPerfil", token.verifyJWT, userController.verPerfilGet);

route.get("/verMeuPerfil", token.verifyJWT, userController.verMeuPerfilGet);

// route.put(
//     "/atualizarPerfil",
//     token.verifyJWT,
//     authorize("atualizarPerfil"),
//     token.verifyUser,
//     userController.atualizarPerfilPut
// );

route.put("/atualizarEmail", token.verifyJWT, userController.atualizarEmailPut);

route.put("/atualizarSenha", token.verifyJWT, userController.atualizarSenhaPut);

route.put("/adicionarNaLista", token.verifyJWT, userController.adicionarListaPut);

route.put("/removerDaLista", token.verifyJWT, userController.removerListaPut);


route.post(
    "/criarPerfil",
    userController.criarPerfilPost,
    loginController.authUser
);

route.delete(
    "/deletarPerfil/:id",
    token.verifyJWT,
    authorize("deletarPerfil"),
    token.verifyUser,
    userController.deletarPerfilDelete
);

//CONTROLE E ROTEAMENTO DE LOGIN
route.post("/authUser", loginController.authUser);

module.exports = route;
