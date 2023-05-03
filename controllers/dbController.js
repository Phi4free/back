const mongoose = require('mongoose');
const { Article, User } = require('../models/dbModel');
const { connectToDatabase } = require("../middlewares/mongo-db-connection");

module.exports.dbCreateArticle = async (article) => {
  const newArticle = new Article(article);
  const savedArticle = await newArticle.save();
  console.log(`Inserted article with ID: ${savedArticle._id}`);
  return savedArticle ? { message: "OK", savedArticle, status: 200 } : { message: "Error creating article", status: 404 };
};

module.exports.dbReadArticle = async (id) => {
  try {
    const article = await Article.findById(id);
    return article ? { message: "OK", article, status: 200 } : { message: "Article not found", status: 404 };
  } catch(err) {
    const article = undefined;
    return article ? { message: "OK", article, status: 200 } : { message: "Article not found", status: 404 };
  }
};

module.exports.dbListArticles = async () => {
  const articles = await Article.find({});
  return articles ? { message: "OK", articles, status: 200 } : { message: "No articles were found", status: 404 };
};

module.exports.dbUpdateArticle = async (article) => {
  article.dataEdt = Date.now();
  const updatedArticle = await Article.findByIdAndUpdate(
    article._id,
    { $set: article, $inc: { __v: 1 } },
    { new: true }
  );
  return updatedArticle ? { message: "OK", updatedArticle, status: 200 } : { message: "Article not found", status: 404 };
};


module.exports.dbDeleteArticle = async (id) => {
  const result = await Article.deleteOne({ _id: id });
  let deletedCount = result.deletedCount;
  console.log(`Article with ID: ${id} was deleted`);
  return deletedCount ? { message: "OK", deletedCount, status: 200 } : { message: "Article not found", status: 404 };
};

module.exports.dbAuthenticator = async (login) => {
  const user = await User.findOne({ email: login.email, senha: login.senha });
  return user ? user._id : -1;
};

module.exports.dbCreateUser = async (user) => {
  const newUser = new User(user);
  const savedUser = await newUser.save();
  console.log(`New user created with ID: ${savedUser._id}`);
  return savedUser ? { message: "OK", savedUser, status: 200 } : { message: "Error creating user", status: 404 };
};

module.exports.dbReadUser = async (id) => {
  try {
    const user = await User.findById(id);
    return user ? { message: "OK", user, status: 200 } : { message: "User not found", status: 404 };
  } catch (err) {
    const user = undefined;
    return user ? { message: "OK", user, status: 200 } : { message: "User not found", status: 404 };
  }
};

module.exports.dbUpdateUser = async (user) => {
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $set: user, $inc: { __v: 1 } },
    { new: true }
  );
  return updatedUser ? { message: "OK", updatedUser, status: 200 } : { message: "User not found", status: 404 };
};

module.exports.dbDeleteUser = async (id) => {
  const result = await User.deleteOne({ _id: id });
  let deletedCount = result.deletedCount;
  console.log(`User with ID: ${id} was deleted`);
  return deletedCount ? { message: "OK", deletedCount, status: 200 } : { message: "User not found", status: 404 };
};