// src/utils/seedDatabase.ts
import Hero from '../models/Hero';
import fs from 'fs';
import path from 'path';

export const seedDatabase = async () => {
  try {
    console.log('Début');

    // 1. Vider la collection
    await Hero.deleteMany();
    console.log('Anciens héros supprimés');

    // 2. Lire et parser le JSON
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../../../frontend/src/data/SuperHerosComplet.json'), 'utf-8'));

    // 3. Mapper les champs JSON → Mongoose
    const mapped = data.superheros.map((h: any) => ({
      nom: h.name,
      alias: h.biography?.fullName || h.name,
      univers: h.biography?.publisher || 'Autre',
      pouvoirs: h.biography?.aliases?.join(', ') || '',
      description: h.work?.occupation || '',
      image: h.images?.lg || '',
      origine: h.biography?.placeOfBirth || 'Inconnu',
      premiereApparition: h.biography?.firstAppearance || '',
    }));

    console.log('Nombre héros à insérer :', mapped.length);

    // 4. Insérer dans MongoDB
    await Hero.insertMany(mapped);

    console.log('terminé');
  } catch (err) {
    console.error('Erreur lors du seed :', err);
  }
};