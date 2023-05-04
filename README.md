# DW2A4--BACK-END--Projeto
[Back-End] Projeto de Desenvolvimento Web 2 - Plataforma de Estudos

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn start

# npm
npm run start

# pnpm
pnpm start
```

## Informações 2023-05-04

- Arquivo server.js do root foi renomeado para index.js
- O Vercel usa o arquivo api/index.js para instanciar o servidor, o index.js do root
foi modificado para máximo aproveitamento de código
- Houveram problemas com o dotenv no Vercel, carregamento foi desativado em produção,
foi adicionada uma nova variável de ambiente (AMBIENTE) para tratar isso
- Houveram problemas com a consulta no banco de dados, é recomendado testar todas as rotas do projeto
antes de fazer o deploy da aplicação. Observar a rota /authUser para mais detalhes
- Rota /status para consulta de disponibilidade deste Backend
- A pasta /public serve para hospedagem de arquivos estáticos, é possível acessar o arquivo texto.txt
pode ser acessado com {{baseUrl}}/texto.txt

