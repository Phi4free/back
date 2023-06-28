const mongoose = require('mongoose');

//ARTICLE SCHEMA --------------------------------------------------------------------------------------------------------------
const ArticleSchema = new mongoose.Schema({
    autorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    disciplina: {
      type: String,
      required: true
    },
    titulo: {
      type: String,
      required: true
    },
    conteudo: {
      type: String,
      required: true
    },
    dataPub: {
      type: Date,
      default: Date.now
    },
    dataEdt: {
      type: Date
    }
  });

ArticleSchema.pre('save', function(next) {
    if (!this.isNew) {
      return next(); // Only set dataPub if document is new
    }
    this.dataPub = Date.now();
    next();
});

const Article = mongoose.model('Article', ArticleSchema);

//NOTA SCHEMA --------------------------------------------------------------------------------------------------------------
const NotaSchema = new mongoose.Schema({
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String
    }
});

const Nota = mongoose.model('Nota', NotaSchema);


//USER SCHEMA --------------------------------------------------------------------------------------------------------------
const UserSchema = new mongoose.Schema({
    nome: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    senha: {
      type: String,
      required: true
    },
    dataIni: {
      type: Date,
      default: Date.now
    },
    numArt: {
      type: Number,
      default: 0
    },
    listaLeitura: {
      type: [String],
      default: []
    },
    notas: {
      type: [NotaSchema],
      default: []
    },
    role: {
      type: String,
      enum: ['Student', 'Teacher', 'Curator', 'Administrator'],
      default: 'Student'
    }
});

UserSchema.pre('save', function(next) {
    if (!this.isNew) {
      return next(); // Only set dataIni if document is new
    }
    this.dataIni = Date.now();
    next();
});
  
const User = mongoose.model('users', UserSchema);

module.exports = {
    Article,
    User, Nota
  }
  