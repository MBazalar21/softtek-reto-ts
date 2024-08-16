"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharacter = void 0;
const characterService_1 = require("../services/characterService");
const getCharacter = async (event) => {
    const id = event.pathParameters?.id || '0';
    try {
        const character = await (0, characterService_1.getCharacterById)(id);
        return {
            statusCode: 200,
            body: JSON.stringify(character),
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
exports.getCharacter = getCharacter;
