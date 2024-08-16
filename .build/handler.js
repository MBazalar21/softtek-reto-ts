"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.getPlanetApi = exports.getCharacterApi = void 0;
const serverless_http_1 = __importDefault(require("serverless-http"));
const express_1 = __importDefault(require("express"));
const characterController_1 = require("./src/characters/controller/characterController");
const planetController_1 = require("./src/planets/controller/planetController");
const app = (0, express_1.default)();
app.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "Hello from Hector!",
    });
});
app.get("/hello", (req, res, next) => {
    return res.status(200).json({
        message: "Hello from path!",
    });
});
app.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    });
});
exports.getCharacterApi = characterController_1.getCharacter;
exports.getPlanetApi = planetController_1.getPlanet;
exports.handler = (0, serverless_http_1.default)(app);
