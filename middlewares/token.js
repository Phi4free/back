const { req, res } = require("express");
const jwt = require('jsonwebtoken');
const { dbReadArticle, dbReadUser } = require("../controllers/dbController");
const Tradutor = require("../tradutor");

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (!token) {
      return res.status(403).json({ message: Tradutor.t('noToken'), status: 403 });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    const dbResult = await dbReadUser(decoded.id);

    if (dbResult.status !== 200) {
      return res.status(401).json({ message: Tradutor.t('tokenFail401'), status: 401 });
    }

    // Attach user to the request object
    req.user = dbResult.user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: Tradutor.t('tokenFail401'), status: 500 });
  }
}

const verifyAuthor = async (req, res, next) => {
    try {
      let articleId = (req.body._id || req.params.id);
      let bdReq = await dbReadArticle(articleId);
      if (bdReq.status != 404) {
        if (req.user._id.toString() === bdReq.article.autorId.toString()) {
          next();
        } else {
          return res.status(403).send({ auth: false, message: Tradutor.t('articleAcessDenied403'), status: 403 });
        }
      } else {
        return res.send(bdReq);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({message: "Internal Server error", status: 500});
    }
};

const verifyUser = async (req, res, next) => {
  try {
    let reqId = (req.body._id || req.params.id);
    let bdReq = await dbReadUser(reqId);
    if (bdReq.status != 404) {
      if (req.user._id.toString() === bdReq.user._id.toString()) {
        next();
      } else {
        return res.status(403).send({ auth: false, message: Tradutor.t('userMismatch'), status: 403 });
      }
    } else {
      return res.status(bdReq.status).send({ message: bdReq.message });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({message: "Internal Server error", status: 500});
  }
};

module.exports = { verifyJWT, verifyAuthor, verifyUser };