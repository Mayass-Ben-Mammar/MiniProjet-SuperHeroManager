import mongoose, { Document, Schema } from 'mongoose';

// frontend/src/types/Hero.ts
export interface Hero {
  _id?: string;
  nom: string;
  alias: string;
  univers: string;
  pouvoirs: string[];
  description: string;
  image: string;
  origine: string;
  premiereApparition: string;
}
const HeroSchema: Schema = new Schema({
  nom: { type: String, required: true },
  alias: { type: String, required: true },
  univers: { type: String, required: true },
  pouvoirs: {
  type: [String],
  required: true,
  set: (v: string | string[]) => (typeof v === 'string' ? v.split(',').map((s: string) => s.trim()) : v),
},
  description: { type: String, required: true },
  image: { type: String, required: false },
  origine: { type: String, required: true },
  premiereApparition: { type: String, required: false },
});

export default mongoose.model<Hero>('Hero', HeroSchema);
