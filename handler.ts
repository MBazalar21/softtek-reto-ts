import serverless from "serverless-http";
import express, { Request, Response, NextFunction } from "express";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import {getCharacter,createCharacter,getPersonById} from './src/characters/controller/characterController';
import {getPlanet} from './src/planets/controller/planetController';

// Configuración de Swagger
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentación de la API usando Swagger',
    },
  },
  apis: ['./src/characters/controller/*.ts'], // Ajusta el path según tu estructura de proyecto
});

const app = express();

// Middleware para Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "Hola es la api libre de Hector!",
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export const getCharacterApi= getCharacter;
export const createCharacterApi= createCharacter;
export const getCharacterApiDb= getPersonById;
export const getPlanetApi = getPlanet;

export const handler  = serverless(app);