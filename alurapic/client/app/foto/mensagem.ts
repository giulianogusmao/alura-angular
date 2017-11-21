export class Mensagem {

    constructor(
        private _mensagem: string, 
        private _inclusao: boolean = false
    ) { }

    get mensagem() {
        return this._mensagem;
    }
    
    get inclusao() {
        return this._inclusao;
    }
}
