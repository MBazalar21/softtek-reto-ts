import { ApiClient } from '../utils/apiClient';

const apiClient = new ApiClient({
  baseURL: 'https://swapi.dev/api',
});

export const fetchCharacterById = async (id: string) => {
  return apiClient.get(`/people/${id}`);
};

export const fetchPlanetById = async (id: string) => {
  return apiClient.get(`/planets/${id}`);
};