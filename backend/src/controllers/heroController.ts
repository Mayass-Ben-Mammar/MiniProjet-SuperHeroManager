import { Request, Response } from 'express';
import Hero from '../models/Hero';
import fs from 'fs';
import path from 'path';

export const getAllHeroes = async (req: Request, res: Response) => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

export const getHeroById = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé.' });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

export const createHero = async (req: Request, res: Response) => {
  console.log("📦 Corps reçu :", req.body);
  try {
    const { nom, alias, univers, pouvoirs, description, origine, premiereApparition } = req.body;
    const image = (req.file as Express.Multer.File)?.filename;
    const hero = new Hero({ nom, alias, univers, pouvoirs, description, image, origine, premiereApparition });
    await hero.save();
    res.status(201).json(hero);
  } catch (err: any) {
  console.error("❌ Erreur Mongoose :", err.message);
  res.status(400).json({ message: err.message });}

};

export const updateHero = async (req: Request, res: Response) => {
  console.log("📸 Image reçue :", req.file?.filename || "aucune");
  try {
    const { nom, alias, univers, pouvoirs, description, origine, premiereApparition } = req.body;
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé.' });

    if (req.file) {
      const oldImagePath = path.join(__dirname, '../../uploads', hero.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      hero.image = (req.file as Express.Multer.File).filename;
    }

    hero.nom = nom;
    hero.alias = alias;
    hero.univers = univers;
    hero.pouvoirs = pouvoirs;
    hero.description = description;
    hero.origine = origine;
    hero.premiereApparition = premiereApparition;

    await hero.save();
    res.json(hero);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du héros.' });
  }
};

export const deleteHero = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id);
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé.' });
    if (hero.image) {
      const imagePath = path.join(__dirname, '../../uploads', hero.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
    res.json({ message: 'Héros supprimé avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

export const getHeroByName = async (req: Request, res: Response) => {
  console.log("🔍 Nom recherché :", req.params.name);
  try {
    const hero = await Hero.findOne({ nom: req.params.name });
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé.' });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

export const updateHeroByName = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findOne({ nom: req.params.name });
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé.' });

    if (req.file) {
      const oldImagePath = path.join(__dirname, '../../uploads', hero.image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      hero.image = (req.file as Express.Multer.File).filename;
    }

    const { nom, alias, univers, pouvoirs, description, origine, premiereApparition } = req.body;
    Object.assign(hero, { nom, alias, univers, pouvoirs, description, origine, premiereApparition });
    await hero.save();
    res.json(hero);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour.' });
  }
};

export const deleteHeroByName = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findOneAndDelete({ nom: req.params.name });
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé.' });
    if (hero.image) {
      const imagePath = path.join(__dirname, '../../uploads', hero.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
    res.json({ message: 'Héros supprimé avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};


// DEBUG EXPORT
console.log('🔍 EXPORT CHECK');
console.log('getHeroByName', typeof getHeroByName);
console.log('updateHeroByName', typeof updateHeroByName);
console.log('deleteHeroByName', typeof deleteHeroByName);
