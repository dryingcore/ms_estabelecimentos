"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMainRoute = void 0;
const logMainRoute = (request, reply) => {
    reply.status(200).send({
        message: 'Well, hello there!',
        version: '1.0.0',
        author: 'decodesoftware',
        origin: 'https://github.com/decodesoftware/tonajagua',
        repository: 'https://github.com/decodesoftware/tonajagua',
        documentation: 'https://github.com/decodesoftware/tonajagua',
        request: {
            method: request.method,
            url: request.url,
            headers: request.headers,
            query: request.query,
            params: request.params,
            body: request.body,
        },
    });
};
exports.logMainRoute = logMainRoute;
