const { req, res } = require("express");
const jwt = require('jsonwebtoken');
const { dbReadArticle, dbReadUser } = require("../controllers/dbController");

module.exports.verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided', status: 401 });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token', status: 401 });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.id = decoded.id;
      next();
    });
}

module.exports.authAutor = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided', status: 401 });
    
    jwt.verify(token, process.env.SECRET, async function(err, decoded) {
      if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token', status: 401 });
      
      // se tudo estiver ok, salva no request para uso posterior
      let userId = decoded.id;
      let articleId = (req.body._id || req.params.id);
      let bdReq = await dbReadArticle(articleId);
      if (bdReq.status != 404) {
        if (userId == bdReq.article.autorId) {
            req.id = userId;
            next();
          } else {
            return res.status(403).json({auth: false, message: 'You cannot access this article', status: 403});
          }
      } else {
        return res.send(bdReq);
      }
      
    });
}

module.exports.authUser = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided', status: 401 });
    
    jwt.verify(token, process.env.SECRET, async function(err, decoded) {
      if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token', status: 401 });
      
      // se tudo estiver ok, salva no request para uso posterior
      userId = decoded.id;
      let reqId = (req.body._id || req.params.id);
      let bdReq = await dbReadUser(reqId);
      if (bdReq.status != 404) {
        if (userId == bdReq.user._id) {
            next();
          } else {
            return res.status(403).json({auth: false, message: 'User mismatch', status: 403});
          }
      } else {
        //console.log("bdReq: " + JSON.stringify(bdReq));
        return res.status(bdReq.status).send({message: bdReq.message});
      }
    });
}