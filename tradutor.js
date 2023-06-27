const Tradutor = {
    selectedLanguage : "",

    t(text){
        return this.resources[this.selectedLanguage].translation[text]
    },

    resources : {
        en: {
            translation: {
                Financial: "Financial",
                Philosophical: "Philosophical",
                Physical: "Physical",
                Functional: "Functional",
                //
                permission403: "Forbidden action: You don't have the appropriate permissions",
                error: 'Internal Server Error',
                updatedEmail200: 'Email updated successfully!',
                invalidEmail: 'Invalid Email',
                updatedPass200: "Password updated successfully!",
                weakPassword: 'Your password must have more than 8 characters, uppercase, lowercase and special characters',
                article403: 'Your current account cannot create articles. Contact us to validate your profile as a content creator!',
                createArticle404: 'Error creating article',
                readArticle404: 'Article not found',
                listArticle404: 'No articles were found',
                createUser404: 'Error creating user, please try again later',
                emailInUse400: 'This e-mail is already in use',
                readUser404: 'User not found',
                property: 'Property',
                cannotNull: 'cannot be empty',
                mustOver: 'must be over',
                mustUnder: 'and under',
                characters: 'characters',
                missingProperty: 'Missing required property',
                noToken: 'No token provided.',
                tokenFail401: 'Failed to authenticate token.',
                articleAcessDenied403: 'You cannot access this article',
                userMismatch: 'User not found',
                invalidLogin: 'Invalid email or password',
            }
        },
        "pt-BR": {
            translation:{
                Financial: "Financeira",
                Philosophical: "Filosófica",
                Physical: "Física",
                Functional: "Funcional",
                //
                permission403: "Ação proibida: Você não possui as permissões necessárias",
                error: 'Erro interno do servidor',
                updatedPass200: "Senha atualizada com sucesso!",
                updatedEmail200: 'Email atualizado com sucesso!',
                invalidEmail: 'Email inválido',
                weakPassword: 'Sua senha deve ter mais de 8 caracteres, maiúsculas, minúsculas e caracteres especiais',
                article403: 'Sua conta atual não pode criar artigos. Entre em contato conosco para validar seu perfil como criador de conteúdo!',
                createArticle404: 'Erro ao criar artigo',
                readArticle404: 'Artigo não encontrado',
                listArticle404: 'Nenhum artigo encontrado',
                createUser404: 'Erro ao criar usuário, por favor tente novamente mais tarde',
                emailInUse400: 'Este e-mail já está sendo usado',
                readUser404: 'Usuário não encontrado',
                property: 'O campo',
                cannotNull: 'não pode ficar vazio',
                missingProperty: 'Campo obrigatório vazio',
                mustOver: 'deve ter entre',
                mustUnder: 'e',
                characters: 'caracteres',
                noToken: 'Nenhum token encontrado',
                tokenFail401: 'Falha na autenticação do token.',
                articleAcessDenied403: 'Você não pode acessar este artigo',
                userMismatch: 'Usuário não encontrado',
                invalidLogin: 'Email ou senha inválidos',
            }
        },
    },
}

module.exports = Tradutor