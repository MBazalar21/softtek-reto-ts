"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = void 0;
class ApiClient {
    constructor(config) {
        this.baseURL = config.baseURL;
        this.headers = config.headers || {
            'Content-Type': 'application/json',
        };
    }
    async request(endpoint, options) {
        const url = `${this.baseURL}${endpoint}`;
        const response = await fetch(url, {
            ...options,
            headers: {
                ...this.headers,
                ...options.headers,
            },
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }
        return response.json();
    }
    get(endpoint, headers) {
        return this.request(endpoint, {
            method: 'GET',
            headers,
        });
    }
    post(endpoint, body, headers) {
        return this.request(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });
    }
    put(endpoint, body, headers) {
        return this.request(endpoint, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body),
        });
    }
    delete(endpoint, headers) {
        return this.request(endpoint, {
            method: 'DELETE',
            headers,
        });
    }
}
exports.ApiClient = ApiClient;
