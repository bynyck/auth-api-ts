export class ErroAplicacao extends Error {

    readonly statusCode: number;

    constructor(mensagem: string, statusCode: number) {
        super(mensagem);

        this.statusCode = statusCode;
    }
}