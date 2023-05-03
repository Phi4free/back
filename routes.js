const express = require("express");
const route = express.Router();
const token = require("./middlewares/token");
const loginController = require("./controllers/loginController");



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
    
module.exports = route;

