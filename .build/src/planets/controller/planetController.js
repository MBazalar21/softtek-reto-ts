"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlanet = void 0;
const planetService_1 = require("../services/planetService");
const getPlanet = async (event) => {
    const id = event.pathParameters?.id || '0';
    try {
        const planet = await (0, planetService_1.getPlanetById)(id);
        return {
            statusCode: 200,
            body: JSON.stringify(planet),
        };
    }
    catch (error) {
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
exports.getPlanet = getPlanet;
