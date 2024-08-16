"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlanetById = void 0;
const swapiRepository_1 = require("../../shared/repositories/swapiRepository");
const getPlanetById = async (id) => {
    const planetData = await (0, swapiRepository_1.fetchPlanetById)(id);
    // Aquí puedes agregar lógica adicional, como transformar datos o agregar cálculos
    return planetData;
};
exports.getPlanetById = getPlanetById;
