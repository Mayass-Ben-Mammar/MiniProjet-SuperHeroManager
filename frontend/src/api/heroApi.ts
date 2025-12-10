// frontend/src/api/heroApi.ts
import axios from 'axios';

interface Hero {
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

const API = axios.create({
  baseURL: '/api',
});

export const getHeroes = async (): Promise<Hero[]> => {
  const res = await API.get('/heroes');
  return res.data;
};

export const getHeroByName = async (name: string): Promise<Hero> => {
  const res = await API.get(`/heroes/name/${encodeURIComponent(name)}`);
  return res.data;
};