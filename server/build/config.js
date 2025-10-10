"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.HOST = void 0;
exports.HOST = process.env.HOST || '0.0.0.0';
exports.PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
