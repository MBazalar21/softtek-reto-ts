"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharacterById = void 0;
const swapiRepository_1 = require("../../shared/repositories/swapiRepository");
const getCharacterById = async (id) => {
    const characterData = await (0, swapiRepository_1.fetchCharacterById)(id);
    // Aquí puedes agregar lógica adicional, como transformar datos o agregar cálculos
    return characterData;
};
exports.getCharacterById = getCharacterById;
