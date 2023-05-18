const { Article, User } = require('../models/dbModel');
const { encryptPassword, validatePassword } = require('../middlewares/encryption');

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
  const user = await User.findOne({ email: login.email }).exec();
  if (user && await validatePassword(login.senha, user.senha)) {
    return user._id
  } else {
    return -1;
  }
};

module.exports.isEmailInUse = async (object) => {
  const email = object.email;
  const user = await User.findOne({ email });
  return !!user; // Returns true if user exists, false otherwise
}

module.exports.dbCreateUser = async (user) => {
  if (await this.isEmailInUse(user)) {
    return { message: "This e-mail is already in use", status: 400 }
  }
  aux = user.senha;
  user.senha = await encryptPassword(aux);
  const newUser = new User(user);
  const savedUser = await newUser.save();
  console.log(`New user created with ID: ${savedUser._id}`);
  const savedUserObject = savedUser.toObject();
  savedUserObject.senha = aux;
  return savedUser ? { message: "OK", savedUserObject, status: 200 } : { message: "Error creating user", status: 404 };
};

module.exports.dbReadUser = async (id) => {
  try {
    const user = await User.findById(id).select('-senha'); // Exclude the 'senha' field
    return user ? { message: "OK", user, status: 200 } : { message: "User not found", status: 404 };
  } catch (err) {
    console.log(err);
    return { message: "User not found", status: 404 };
  }
};

module.exports.dbUpdateUser = async (user) => {
  user.senha = await encryptPassword(user.senha);
  
  const existingUser = await User.findById(user._id);
  if (!existingUser) {
    return { message: "Existing user not found", status: 404 };
  }
  
  // Check if the new email is different from the original
  if (user.email !== existingUser.email) {
    // Check if the new email is already in use
    const emailInUse = await User.exists({ email: user.email });
    if (emailInUse) {
      return { message: "Email is already in use", status: 400 };
    }
  }
  
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $set: user, $inc: { __v: 1 } },
    { new: true }
  );
  
  return updatedUser ? { message: "OK", updatedUser, status: 200 } : { message: "Updated user not found", status: 404 };
};


module.exports.dbDeleteUser = async (id) => {
  const result = await User.deleteOne({ _id: id });
  let deletedCount = result.deletedCount;
  console.log(`User with ID: ${id} was deleted`);
  return deletedCount ? { message: "OK", deletedCount, status: 200 } : { message: "User not found", status: 404 };
};