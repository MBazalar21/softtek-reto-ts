import request from 'supertest';
import {app} from '../../../handler'; // Ajusta la ruta según la estructura de tu proyecto
import { PersonRepository } from '../repositories/person.repository';
import { Person } from '../models/person.model';

// Mock de PersonRepository
jest.mock('../repositories/person.repository');

const mockPersonRepository = PersonRepository as jest.MockedClass<typeof PersonRepository>;

describe('Character Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /character', () => {
    it('should create a new person', async () => {
      const newPerson = {
        nombre: "Luke Skywalker 3",
        altura: "172",
        masa: "77",
        color_cabello: "blond",
        color_piel: "fair",
        color_ojos: "blue",
        año_nacimiento: "19BBY",
        género: "male"
      };

      // Simular la respuesta del repositorio
      mockPersonRepository.prototype.getPersonByName.mockResolvedValue(null);
      mockPersonRepository.prototype.insertPerson.mockResolvedValue(14);

      const response = await request(app).post('/character').send(newPerson);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Character created successfully');
    });

    it('should return 500 on server error', async () => {
      const newPerson = {
        nombre: "Luke Skywalker 2",
        altura: "172",
        masa: "77",
        color_cabello: "blond",
        color_piel: "fair",
        color_ojos: "blue",
        año_nacimiento: "19BBY",
        género: "male"
      };

      // Simular un error en el repositorio
      mockPersonRepository.prototype.insertPerson.mockImplementation(() => {
        throw new Error('Database error');
      });

      const response = await request(app).post('/character').send(newPerson);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'OCURRIO UN ERROR');
    });
  });

  describe('GET /character/{id}', () => {
    it('should return character data', async () => {
      const characterId = '1';
      const mockCharacter : Person = {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        skin_color: "blond",
        hair_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male"
      };

      // Simular la respuesta del repositorio
      mockPersonRepository.prototype.getPersonById.mockResolvedValue(mockCharacter);

      const response = await request(app).get(`/character/${characterId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCharacter);
    });

    it('should return 500 on server error', async () => {
      const characterId = '1';

      // Simular un error en el repositorio
      mockPersonRepository.prototype.getPersonById.mockImplementation(() => {
        throw new Error('Database error');
      });

      const response = await request(app).get(`/character/${characterId}`);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Ocurrió un error inesperado');
    });
  });
});