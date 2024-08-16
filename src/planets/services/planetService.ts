import {fetchPlanetById} from '../../shared/repositories/swapiRepository';

export const getPlanetById = async (id: string) => {
  const planetData = await fetchPlanetById(id);
  // Aquí puedes agregar lógica adicional, como transformar datos o agregar cálculos
  return planetData;
};