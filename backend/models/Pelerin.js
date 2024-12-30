const mongoose = require('mongoose');

const pelerinSchema = new mongoose.Schema({
  civilite: {
    type: String,
    enum: ['M.', 'Mme', 'Mlle'],
    required: [true, 'La civilité est requise']
  },
  nom: {
    type: String,
    required: [true, 'Le nom est requis']
  },
  prenom: {
    type: String,
    required: [true, 'Le prénom est requis']
  },
  nationalite: {
    type: String,
    required: [true, 'La nationalité est requise']
  },
  telephone: {
    type: String,
    required: [true, 'Le numéro de téléphone est requis']
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    lowercase: true
  },
  adresse: {
    rue: {
      type: String,
      required: [true, 'La rue est requise']
    },
    numero: {
      type: String,
      required: [true, 'Le numéro est requis']
    },
    ville: {
      type: String,
      required: [true, 'La ville est requise']
    },
    codePostal: {
      type: String,
      required: [true, 'Le code postal est requis'],
      match: [/^[0-9]{5}$/, 'Le code postal doit contenir 5 chiffres']
    }
  },
  chambre: {
    type: {
      type: String,
      enum: ['quadruple', 'triple', 'double'],
      required: [true, 'Le type de chambre est requis']
    },
    supplement: {
      type: Number,
      required: true,
      default: 0
    }
  },
  typePelerinage: {
    type: String,
    enum: ['hajj', 'omra'],
    required: [true, 'Le type de pèlerinage est requis']
  },
  dateDepart: {
    type: String,
    required: [true, 'La date de départ est requise']
  },
  besoinsSpeciaux: {
    type: String,
    default: ''
  },
  dateInscription: {
    type: Date,
    default: Date.now
  }
});

// Index unique sur la combinaison nom, prénom et email
pelerinSchema.index({ nom: 1, prenom: 1, email: 1 }, { unique: true });

const Pelerin = mongoose.model('Pelerin', pelerinSchema);

module.exports = Pelerin; 