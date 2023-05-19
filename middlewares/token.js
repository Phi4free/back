const { req, res } = require("express");
const jwt = require('jsonwebtoken');
const { dbReadArticle, dbReadUser } = require("../controllers/dbController");

module.exports.verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (!token) {
      return res.status(403).json({ message: 'No token provided.', status: 403 });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    const dbResult = await dbReadUser(decoded.id);

    if (dbResult.status !== 200) {
      return res.status(401).json({ message: 'Failed to authenticate token.', status: 401 });
    }

    // Attach user to the request object
    req.user = dbResult.user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Failed to authenticate token.', status: 500 });
  }
}

module.exports.verifyAuthor = async (req, res, next) => {
  await verifyJWT(req, res, async () => {
    let articleId = (req.body._id || req.params.id);
    let bdReq = await dbReadArticle(articleId);
    if (bdReq.status != 404) {
      if (req.user._id == bdReq.article.autorId) {
        next();
      } else {
        return res.status(403).json({ auth: false, message: 'You cannot access this article', status: 403 });
      }
    } else {
      return res.send(bdReq);
    }
  });
};

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