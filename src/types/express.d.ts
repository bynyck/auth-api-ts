export {};

declare global { // Vou complementar uma declaração que existe globalmente.
    namespace Express { // É onde o Express declara alguns dos seus tipos.
        interface Request {
            dadosValidados?: {
                body?: unknown,
                params?: unknown;
                query?: unknown
            }
        }
    }
}