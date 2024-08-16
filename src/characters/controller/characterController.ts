import { APIGatewayProxyHandler } from 'aws-lambda';
import { getCharacterById } from '../services/characterService';

import { Person } from '../models/person.model';
import { PersonRepository } from '../repositories/person.repository';
// @ts-ignore
import objectMapper from 'object-mapper';
// @ts-ignore
import characterEn from '../../shared/translate/en/character.json';
// @ts-ignore
import characterEs from '../../shared/translate/es/character.json';
import { response } from 'express';

const personRepository = new PersonRepository();
const mapRules = {characterEn,characterEs};
/**
 * @swagger
 * tags:
 *   name: Character
 *   description: API para obtener información de personajes
 */

/**
 * @swagger
 * /character/{id}:
 *   get:
 *     summary: Obtener un personaje por ID
 *     description: Retorna la información de un personaje dado su ID.
 *     tags: [Character]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del personaje
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información del personaje
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 altura:
 *                   type: string
 *                 masa:
 *                   type: string
 *                 color_pelo:
 *                   type: string
 *                 color_ojos:
 *                   type: string
 *                 ano_nacimiento:
 *                   type: string
 *                 genero:
 *                   type: string
 *                 planeta_origen:
 *                   type: string
 *       500:
 *         description: Error al obtener el personaje
 */

export const getCharacter : APIGatewayProxyHandler = async (event) => {
  const id = event.pathParameters?.id || '0';

  try {
    const characterData = await getCharacterById(id);
    const translatedData = objectMapper(characterData, mapRules.characterEn);

    return {
      statusCode: 200,
      body: JSON.stringify(translatedData),
    };
  } catch (error) {
    // Verificar si el error es del tipo que esperamos
    if (error instanceof Error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error.message }),
      };
    }

    // Si no es del tipo `Error`, se trata como un error genérico
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Ocurrió un error inesperado' }),
    };
  }
};

/**
 * @swagger
 * /character/database/{id}:
 *   get:
 *     summary: Obtener un personaje por ID registrado en la bd
 *     description: Retorna la información de un personaje dado su ID.
 *     tags: [Character]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del personaje
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información del personaje
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 altura:
 *                   type: string
 *                 masa:
 *                   type: string
 *                 color_pelo:
 *                   type: string
 *                 color_ojos:
 *                   type: string
 *                 ano_nacimiento:
 *                   type: string
 *                 genero:
 *                   type: string
 *                 planeta_origen:
 *                   type: string
 *       500:
 *         description: Error al obtener el personaje
 */

export const getPersonById : APIGatewayProxyHandler = async (event) => {
  const id = event.pathParameters?.id ;

  try {
    console.log(id)
    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing request id' }),
      };
    }

    const characterData = await personRepository.getPersonById(parseInt(id));

    console.log(characterData)
    
    if (!characterData) {
      console.log("no se encontro")
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'No se encontro la persona con el id :'+ id+'favor de ingresar un id valido.' }),
      };
    }

    const translatedData = await objectMapper(characterData, mapRules.characterEn);

    console.log(translatedData)

    return {
      statusCode: 200,
      body: JSON.stringify(translatedData),
    };

  } catch (error) {
    // Verificar si el error es del tipo que esperamos
    if (error instanceof Error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error.message }),
      };
    }

    // Si no es del tipo `Error`, se trata como un error genérico
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Ocurrió un error inesperado' }),
    };
  }
};

/**
 * @swagger
 * /character:
 *   post:
 *     summary: Crear un nuevo personaje
 *     description: Registra un nuevo personaje en la base de datos.
 *     tags: [Character]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del personaje
 *               altura:
 *                 type: string
 *                 description: Altura del personaje
 *               masa:
 *                 type: string
 *                 description: Masa del personaje
 *               color_pelo:
 *                 type: string
 *                 description: Color de pelo del personaje
 *               color_ojos:
 *                 type: string
 *                 description: Color de ojos del personaje
 *               año_nacimiento:
 *                 type: string
 *                 description: Año de nacimiento del personaje
 *               género:
 *                 type: string
 *                 description: Género del personaje
 *               planeta_origen:
 *                 type: string
 *                 description: Planeta de origen del personaje
 *     responses:
 *       201:
 *         description: Personaje creado exitosamente
 *       400:
 *         description: Solicitud incorrecta
 *       409:
 *         description: Duplicado en la Solicitud
 *       500:
 *         description: Error del servidor
 */
export const createCharacter: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing request body' }),
      };
    }

    const character = JSON.parse(event.body);
    const translatedData = objectMapper(character, mapRules.characterEs);

    console.log(translatedData)

    // Validar que el JSON tiene los campos necesarios
    if (!translatedData.name || !translatedData.birth_year || !translatedData.gender) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

    const personExist = await personRepository.getPersonByName(translatedData.name)

    console.log('person exists: '+personExist)
    console.log('person exists CONDITION: '+personExist != null)

    if(personExist != null){
      console.log('ingresa condicion')
      return {
        statusCode: 409,
        body: JSON.stringify({ message: 'Person Exist' }),
      };
    }

    const personId = await personRepository.insertPerson(translatedData);

    console.log(personId)
    console.log(translatedData)

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Character created successfully' }),
    };
  } catch (error) {
    console.error('Error creating character:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'OCURRIO UN ERROR' }),
    };
  }
};