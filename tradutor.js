const Tradutor = {
    selectedLanguage : "",

    t(text){
        return this.resources[this.selectedLanguage].translation[text]
    },

    resources : {
        en: {
            translation: {
                invalidEmail: "Invalid Email",
            }
        },
        "pt-BR": {
            translation:{
                invalidEmail: "Email inválido",
            }
        },
    },
}

module.exports = Tradutor