const { dbAuthenticator } = require("../controllers/dbController");
const util = require("util");
const Tradutor = require("../tradutor");

class Login {
    email;
    senha;
    constructor(login) {
        this.email = login.email;
        this.senha = login.senha;
    }

    get email() {
        return this.email;
    }

    get senha() {
        return this.senha;
    }

    async getToken() {
        //console.log("getToken().this: " + util.inspect(this));
        let user = await dbAuthenticator(this);
        if (user == null) {
            return {
                auth: false,
                message: Tradutor.t('invalidLogin'),
                status: 401,
            };
        } else {
            const jwt = require("jsonwebtoken");
            const token = jwt.sign({ id: user._id }, process.env.SECRET, {
                expiresIn: 6000, // expires in 100min
            });
            return { auth: true, token: token, username: user.nome, status: 200 };
        }
    }
}

module.exports = Login;
