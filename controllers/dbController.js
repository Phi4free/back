const { Article, User } = require("../models/dbModel");
const {
    encryptPassword,
    validatePassword,
} = require("../middlewares/encryption");
const Tradutor = require("../tradutor");
const { Collection } = require("mongoose");

module.exports.dbCreateArticle = async (article) => {
    const newArticle = new Article(article);
    const savedArticle = await newArticle.save();
    console.log(`Inserted article with ID: ${savedArticle._id}`);
    return savedArticle
        ? { message: "OK", savedArticle, status: 200 }
        : { message: Tradutor.t("createArticle404"), status: 404 };
};

module.exports.dbReadArticle = async (id) => {
    try {
        const article = await Article.findById(id);
        return article
            ? { message: "OK", article, status: 200 }
            : { message: Tradutor.t("readArticle404"), status: 404 };
    } catch (err) {
        const article = undefined;
        return article
            ? { message: "OK", article, status: 200 }
            : { message: Tradutor.t("readArticle404"), status: 404 };
    }
};

module.exports.dbListArticles = async () => {
    const autores = await User.find({});
    const articles = await Article.find({});

    const pipeline = [
        {
            $lookup: {
                from: "users",
                localField: "autorId",
                foreignField: "_id",
                as: "nomeAutor",
            },
        },
        {
            $project: {
                _id: 1,
                disciplina: 1,
                titulo: 1,
                conteudo: 1,
                dataPub: 1,
                autor: "$nomeAutor.nome",
            },
        },
        { $unwind: "$autor" }
    ];

    let data = await Article.aggregate(pipeline).exec();
    console.log(data);

    return data
        ? { message: "OK", data, status: 200 }
        : { message: Tradutor.t("listArticle404"), status: 404 };
};

// module.exports.dbListArticles = async () => {
//      const articles = await Article.find({});
//      return articles
//          ? { message: "OK", articles, status: 200 }
//          : { message: Tradutor.t("listArticle404"), status: 404 };
//  };

module.exports.dbUpdateArticle = async (article) => {
    article.dataEdt = Date.now();
    const updatedArticle = await Article.findByIdAndUpdate(
        article._id,
        { $set: article, $inc: { __v: 1 } },
        { new: true }
    );
    return updatedArticle
        ? { message: "OK", updatedArticle, status: 200 }
        : { message: Tradutor.t("readArticle404"), status: 404 };
};

module.exports.dbDeleteArticle = async (id) => {
    const result = await Article.deleteOne({ _id: id });
    let deletedCount = result.deletedCount;
    console.log(`Article with ID: ${id} was deleted`);
    return deletedCount
        ? { message: "OK", deletedCount, status: 200 }
        : { message: Tradutor.t("readArticle404"), status: 404 };
};

module.exports.dbAuthenticator = async (login) => {
    const user = await User.findOne({ email: login.email }).exec();
    if (user && (await validatePassword(login.senha, user.senha))) {
        return user;
    } else {
        return null;
    }
};

module.exports.isEmailInUse = async (object) => {
    const email = object.email;
    const user = await User.findOne({ email });
    return !!user; // Returns true if user exists, false otherwise
};

module.exports.dbCreateUser = async (user) => {
    if (await this.isEmailInUse(user)) {
        return { message: Tradutor.t("emailInUse400"), status: 400 };
    }
    aux = user.senha;
    user.senha = await encryptPassword(aux);
    const newUser = new User(user);
    const savedUser = await newUser.save();
    console.log(`New user created with ID: ${savedUser._id}`);
    const savedUserObject = savedUser.toObject();
    savedUserObject.senha = aux;
    return savedUser
        ? { message: "OK", savedUserObject, status: 200 }
        : { message: Tradutor.t("createUser404"), status: 404 };
};

module.exports.dbReadUser = async (id) => {
    try {
        const user = await User.findById(id).select(["nome", "role"]); // Retorna somente os campos publicos
        return user
            ? { message: "OK", user, status: 200 }
            : { message: Tradutor.t("readUser404"), status: 404 };
    } catch (err) {
        console.log(err);
        return { message: Tradutor.t("readUser404"), status: 404 };
    }
};

module.exports.dbUpdateUser = async (user) => {
    // user.senha = await encryptPassword(user.senha);

    const existingUser = await User.findById(user._id);
    if (!existingUser) {
        return { message: Tradutor.t("readUser404"), status: 404 };
    }

    // // Check if the new email is different from the original
    // if (user.email !== existingUser.email) {
    //     // Check if the new email is already in use
    //     const emailInUse = await User.exists({ email: user.email });
    //     if (emailInUse) {
    //         return { message: Tradutor.t("emailInUse400"), status: 400 };
    //     }
    // }

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $set: user, $inc: { __v: 1 } },
        { new: true }
    );

    return updatedUser
        ? { message: "OK", updatedUser, status: 200 }
        : { message: Tradutor.t("readUser404"), status: 404 };
};

module.exports.dbUpdateUserEmail = async (id, email) => {
    // Check if the new email is already in use
    const emailInUse = await User.exists({ email: email });
    if (emailInUse) {
        return { message: Tradutor.t("emailInUse400"), status: 400 };
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: { email: email }, $inc: { __v: 1 } },
        { new: true }
    );

    return updatedUser
        ? { message: Tradutor.t("updatedEmail200"), status: 200 }
        : { message: Tradutor.t("readUser404"), status: 404 };
};

module.exports.dbUpdateUserPassword = async (id, pass) => {
    const existingUser = await User.findById(id);
    if (!existingUser) {
        return { message: Tradutor.t("readUser404"), status: 404 };
    }
    const senha = await encryptPassword(pass);
    const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: { senha }, $inc: { __v: 1 } },
        { new: true }
    );

    return updatedUser
        ? { message: Tradutor.t("updatedPass200"), status: 200 }
        : { message: Tradutor.t("readUser404"), status: 404 };
};

// module.exports.dbUpdateUserPassword = async (user) => {
//     const existingUser = await User.findById(user._id);
//     if (!existingUser) {
//         return { message: Tradutor.t("readUser404"), status: 404 };
//     }
//     user.senha = await encryptPassword(user.senha);

//     const updatedUser = await User.findByIdAndUpdate(
//         user._id,
//         { $set: user, $inc: { __v: 1 } },
//         { new: true }
//     );

//     return updatedUser
//         ? { message: "OK", updatedUser, status: 200 }
//         : { message: Tradutor.t("readUser404"), status: 404 };
// };

module.exports.dbDeleteUser = async (id) => {
    const result = await User.deleteOne({ _id: id });
    let deletedCount = result.deletedCount;
    console.log(`User with ID: ${id} was deleted`);
    return deletedCount
        ? { message: "OK", deletedCount, status: 200 }
        : { message: Tradutor.t("readUser404"), status: 404 };
};
