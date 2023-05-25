const express = require("express");
const route = express.Router();
const token = require("./middlewares/token");
const loginController = require("./controllers/loginController");

route.use(function (req, res, next) {
    Tradutor.selectedLanguage = req.headers?.language || "en";
    next();
});

route.get("/", function (req, res, next) {
    //var pass = req.body("password");
    //var loginx = req.body("login");
    //res.render('index.html', { title: 'Express' });
    res.redirect("/status")
    next
});

route.get("/status", (request, response) => {
    response.send(JSON.stringify({
        status: 'OK',
        message: 'Parece estar funcionando.'
    }));
});

//CONTROLE E ROTEAMENTO DOS ARTIGOS
const artigoController = require("./controllers/artigoController");

route.get("/criarArtigo",
    artigoController.criarArtigoGet);

route.post("/criarArtigo",
    token.verifyJWT, artigoController.criarArtigoPost);

route.get("/lerArtigo/:query?",
    artigoController.lerArtigoGet);

route.get("/listaArtigos",
    artigoController.listaArtigosGet);

route.put("/atualizarArtigo", token.authAutor,
    artigoController.updateArtigoPut);

route.delete("/excluirArtigo/:id", token.authAutor,
    artigoController.excluirArtigoDelete);

//CONTROLE E ROTEAMENTO DOS USUÁRIOS
const userController = require("./controllers/userController");
const { json } = require("body-parser");
const Tradutor = require("./tradutor");

route.get("/verPerfil", 
    userController.verPerfilGet);

route.put("/atualizarPerfil", token.authUser,
    userController.atualizarPerfilPut);

route.post("/criarPerfil", 
    userController.criarPerfilPost, loginController.authUser);

route.delete("/deletarPerfil/:id", token.authUser,
    userController.deletarPerfilDelete);

//CONTROLE E ROTEAMENTO DE LOGIN
route.post("/authUser", 
    loginController.authUser);

//CONTROLE E UPLOAD DE IMAGENS
const bucketController = require("./controllers/bucketController");
route.post("/uploadImage",
    token.verifyJWT, bucketController.saveToMemory, bucketController.uploadToCloudinary, bucketController.saveToDatabase);
    
module.exports = route;

