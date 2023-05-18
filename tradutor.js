const Tradutor = {
    selectedLanguage : "",

    t(text){
        return this.resources[this.selectedLanguage].translation[text]
    },

    resources : {
        en: {
            translation: {
                error: 'Internal Server Error',
                invalidEmail: 'Invalid Email',
                article403: 'Your current account cannot create articles. Contact us to validate your profile as a content creator!',
                createArticle404: 'Error creating article',
                readArticle404: 'Article not found',
                listArticle404: 'No articles were found',
                createUser404: 'Error creating user, please try again later',
                emailInUse400: 'This e-mail is already in use',
                readUser404: 'User not found',
            }
        },
        "pt-BR": {
            translation:{
                error: 'Erro interno do servidor',
                invalidEmail: 'Email inválido',
                article403: 'Sua conta atual não pode criar artigos. Entre em contato conosco para validar seu perfil como criador de conteúdo!',
                createArticle404: 'Erro ao criar artigo',
                readArticle404: 'Artigo não encontrado',
                listArticle404: 'Nenhum artigo encontrado',
                createUser404: 'Erro ao criar usuário, por favor tente novamente mais tarde',
                emailInUse400: 'Este e-mail já está sendo usado',
                readUser404: 'Usuário não encontrado',
            }
        },
    },
}

module.exports = Tradutor