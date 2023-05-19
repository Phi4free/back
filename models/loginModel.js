const { dbAuthenticator } = require("../controllers/dbController");
const util = require('util');

class Login {
    email; senha;
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
        let id = await dbAuthenticator(this);
        if (id == -1) {
            return {auth: false, message: "Invalid login credentials", status: 401};
        } else {
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 6000 // expires in 100min
              });
             return {auth: true, token: token, userId: id, status: 200};
        }
    }
}

module.exports = Login;