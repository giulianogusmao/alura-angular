import { FotoComponent } from './../foto/foto.component';
import { Http, Headers } from '@angular/http';
import  { Injectable } from '@angular/core';

@Injectable()
export class CadastroService {

    constructor(
        private _http: Http
    ) {
    }

    add(foto: FotoComponent) {
        let headers = new Headers();
        headers.set('content-type', 'application/json');
        return this._http.post('v1/fotos', JSON.stringify(foto), { headers: headers });
    }

    remover(foto: FotoComponent) {

    }
}