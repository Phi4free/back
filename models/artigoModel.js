class Artigo {
    id; autorId; disciplina; titulo; conteudo; dataPub; dataEdt;

    constructor(id, autorId, disciplina, titulo, conteudo, dataPub, dataEdt) {
        this.id = id;
        this.autorId = autorId;
        this.disciplina = disciplina;
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.dataPub = dataPub;
        this.dataEdt = dataEdt;
    }

    get id() {
        return this.id;
    }

    get autorId() {
        return this.autorId;
    }

    get disciplina() {
        return this.titulo;
    }

    get titulo() {
        return this.titulo;
    }

    get conteudo() {
        return this.conteudo;
    }

    get dataPub() {
        return  this.dataPub;
    }

    get dataEdt() {
        return this.dataEdt;
    }

    set id(id) {
        this.id = id;
    }
    
    set autorId(autorId) {
        this.autorId = autorId;
    }

    set disciplina(disciplina) {
        this.disciplina = disciplina;
    }
    
    set titulo(titulo) {
        this.titulo = titulo;
    }
    
    set conteudo(conteudo) {
        this.conteudo = conteudo;
    }

    set dataPub(dataPub) {
        this.dataPub = dataPub;
    }
    
    set dataEdt(dataEdt) {
        this.dataEdt = dataEdt;
    }
    
    imprimeTudo() {
        return "ID do Artigo: " + this.id + "\n"
            + "ID do Autor: " + this.autorId + "\n"
            + "Título: " + this.titulo + "\n"
            + "Disciplina: " + this.disciplina + "\n"
            + "Conteúdo: " + this.conteudo + "\n"
            + "Data de Publicação: " + this.dataPub + "\n"
            + "Última edição: " + this.dataEdt;
    }
};

module.exports = Artigo;