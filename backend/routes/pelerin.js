const express = require('express');
const router = express.Router();
const Pelerin = require('../models/Pelerin');
const { ADMIN_EMAIL } = require('../config/admin');

// Créer un nouveau pèlerin
router.post('/', async (req, res) => {
  try {
    console.log('📝 Données reçues:', req.body);
    
    // Vérifier si un pèlerin avec le même nom et prénom existe déjà
    const existingPelerin = await Pelerin.findOne({
      nom: req.body.nom,
      prenom: req.body.prenom
    });

    if (existingPelerin) {
      return res.status(400).json({
        message: `Un(e) pèlerin(e) nommé(e) ${req.body.prenom} ${req.body.nom} est déjà enregistré(e).`,
        type: 'duplicate'
      });
    }

    const pelerin = new Pelerin(req.body);
    const savedPelerin = await pelerin.save();
    
    console.log('✅ Données sauvegardées:', savedPelerin);
    res.status(201).json(savedPelerin);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    // Si l'erreur est due à un doublon (au cas où la vérification précédente aurait échoué)
    if (error.code === 11000) {
      return res.status(400).json({
        message: `Un(e) pèlerin(e) nommé(e) ${req.body.prenom} ${req.body.nom} est déjà enregistré(e).`,
        type: 'duplicate'
      });
    }
    res.status(400).json({ message: error.message });
  }
});

// Obtenir tous les pèlerins
router.get('/', async (req, res) => {
  try {
    const pelerins = await Pelerin.find();
    console.log('📋 Liste des pèlerins récupérée');
    res.json(pelerins);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Rechercher les réservations par email
router.get('/search', async (req, res) => {
  try {
    const { email } = req.query;
    
    // Si c'est l'admin, renvoyer toutes les réservations
    if (email === ADMIN_EMAIL) {
      const allReservations = await Pelerin.find().sort({ dateInscription: -1 });
      return res.json({
        isAdmin: true,
        reservations: allReservations
      });
    }
    
    // Sinon, renvoyer uniquement les réservations de l'utilisateur
    const reservations = await Pelerin.find({ email });
    res.json({
      isAdmin: false,
      reservations
    });
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route pour supprimer toutes les données (uniquement en développement)
router.delete('/clean', async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ 
      message: 'Cette opération n\'est pas autorisée en production' 
    });
  }

  try {
    await Pelerin.deleteMany({});
    console.log('🧹 Base de données nettoyée');
    res.json({ message: 'Toutes les données ont été supprimées avec succès' });
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 