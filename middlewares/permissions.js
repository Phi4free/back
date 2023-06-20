const Tradutor = require("../tradutor");

const accessControlList = {
    'Student': ['lerArtigo', 'listaArtigo', 'verPerfil', 'atualizarPerfil'],
    'Teacher': ['lerArtigo', 'listaArtigo', 'criarArtigo', 'atualizarArtigo', 'excluirArtigo', 'verPerfil', 'atualizarPerfil'],
    'Curator': ['lerArtigo', 'listaArtigo', 'criarArtigo', 'atualizarArtigo', 'excluirArtigo', 'verPerfil', 'atualizarPerfil'],
    'Administrator': ['lerArtigo', 'listaArtigo', 'criarArtigo', 'atualizarArtigo', 'excluirArtigo', 'verPerfil', 'atualizarPerfil', 'excluirPerfil']
}

function authorize(permission) {
    return (req, res, next) => {
      const { user } = req;
      const permissions = accessControlList[user.role];
      if (permissions.includes(permission)) {
        next();
      } else {
        res.status(403).json({ message: Tradutor.t('permission403') });
      }
    };
}

module.exports = { authorize };