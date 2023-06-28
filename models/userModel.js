class User {
    id; nome; email; senha; dataIni; numArt; notas;

    constructor(id, nome, email, senha, dataIni, numArt, notas) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.dataIni = dataIni;
        this.numArt = numArt;
        this.notas = notas;
    }

    get id() {
        return this.id;
    }

    get nome() {
        return this.nome;
    }

    get email() {
        return this.email;
    }

    get senha() {
        return this.senha;
    }

    get dataIni() {
        return this.dataIni;
    }

    get numArt() {
        return this.numArt;
    }

    get notas() {
        return this.notas;
    }

    set id(id) {
        this.id = id;
    }

    set nome(nome) {
        this.nome = nome;
    }

    set email(email) {
        this.email = email;
    }

    set senha(senha) {
        this.senha = senha;
    }

    set dataIni(dataIni) {
        this.dataIni = dataIni;
    }

    set numArt(numArt) {
        this.numArt = numArt;
    }

    set notas(notas) {
        this.notas = notas;
    }

    imprimeTudo() {
        return "ID do Usuário: " + this.id + "\n"
            + "Nome: " + this.nome + "\n"
            + "Email: " + this.email + "\n"
            + "Senha: " + this.senha + "\n"
            + "Data de Início: " + this.dataIni + "\n"
            + "Quantidade de Artigos: " + this.numArt + "\n"
            + "Notas: " + this.notas;
    }
}

module.exports = User;