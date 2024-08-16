import {fetchCharacterById} from '../../shared/repositories/swapiRepository';

export const getCharacterById = async (id: string) => {
  const characterData = await fetchCharacterById(id);
  // Aquí puedes agregar lógica adicional, como transformar datos o agregar cálculos
  return characterData;
};