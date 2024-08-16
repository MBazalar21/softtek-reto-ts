import request from 'supertest';
import express from 'express';
import { createCharacter } from './characterController'; // Ajusta el path según tu estructura
import { describe, it, expect } from '@jest/globals';
import {connectToDatabase}  from '../../config/db';

const app = express();
app.use(express.json());
app.post('/character', createCharacter);

describe('POST /character', () => {
  it('should create a new person', async () => {
    const newPerson = {
      nombre: 'Luke Skywalker prueba tst',
      altura: '172',
      masa: '77',
      color_pelo: 'blonde',
      color_ojos: 'blue',
      ano_nacimiento: '19BBY',
      genero: 'male',
      planeta_origen: 'Tatooine',
    };

    const response = await request(app).post('/character').send(newPerson);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('nombre', 'Luke Skywalker prueba tst');
    // Añade más expectativas según tu lógica
  });

  it('should return 500 on server error', async () => {
    const db = await connectToDatabase();
    jest.spyOn(db, 'insertPerson').mockImplementation(() => {
      throw new Error('Database error');
    });

    const newPerson = { name: 'Luke Skywalker'};

    const response = await request(app).post('/character').send(newPerson);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Error al registrar el personaje');
  });
});
