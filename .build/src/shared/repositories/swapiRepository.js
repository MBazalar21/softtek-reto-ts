"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPlanetById = exports.fetchCharacterById = void 0;
const apiClient_1 = require("../utils/apiClient");
const apiClient = new apiClient_1.ApiClient({
    baseURL: 'https://swapi.dev/api',
});
const fetchCharacterById = async (id) => {
    return apiClient.get(`/people/${id}`);
};
exports.fetchCharacterById = fetchCharacterById;
const fetchPlanetById = async (id) => {
    return apiClient.get(`/planets/${id}`);
};
exports.fetchPlanetById = fetchPlanetById;
