//Require de Módulos Necessários
const express = require("express");
const session = require("express-session");
const uuid = require("uuid").v4;
const routes = require("../routes");
const bodyParser = require('body-parser');
const ambiente = process.env.AMBIENTE || 'DEVELOPMENT'
if (ambiente == 'DEVELOPMENT') {
  require("dotenv-safe").config({
    allowEmptyValues: true
  });
}
const cors = require("cors")
const mongoose = require('mongoose');
//const { connectToDatabase } = require("./middlewares/mongo-db-connection");
const port = process.env.PORT || 3000


//Conectando ao banco MongoDB
if (ambiente != 'DEVELOPMENT') {
  console.log(process.env.URI);
  mongoose
    .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));
}

//Instanciando servidor Express
const app = express();

//Estabelecendo sessão para uso de cookies
/*app.use(session({
    genid: (request) => {
      return uuid();
    },
    secret: "Um segredo",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
}));*/

//Referenciando rotas e pasta pública
app.use(cors());
app.use(express.static("./public"));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(routes);

module.exports = app;
