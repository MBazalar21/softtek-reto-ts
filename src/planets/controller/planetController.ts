import { APIGatewayProxyHandler } from 'aws-lambda';
import { getPlanetById } from '../services/planetService';
// @ts-ignore
import objectMapper from 'object-mapper';
// @ts-ignore
import planet from '../../shared/translate/en/planet.json';

const mapRules = planet;
/**
 * @swagger
 * tags:
 *   name: Planet
 *   description: API para obtener información de planetas
 */

/**
 * @swagger
 * /planets/{id}:
 *   get:
 *     summary: Obtiene un planeta por ID
 *     description: Retorna la información de un planeta con traducción de atributos al español.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del planeta
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Planeta encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 periodo_rotacion:
 *                   type: string
 *                 periodo_orbital:
 *                   type: string
 *                 diametro:
 *                   type: string
 *                 clima:
 *                   type: string
 *                 gravedad:
 *                   type: string
 *                 terreno:
 *                   type: string
 *                 agua_superficial:
 *                   type: string
 *                 poblacion:
 *                   type: string
 *       500:
 *         description: Error al obtener el planeta
 */

export const getPlanet : APIGatewayProxyHandler = async (event) => {
  const id = event.pathParameters?.id || '0';

  try {
    const planet = await getPlanetById(id);

    const translatedData = objectMapper(planet,mapRules)
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