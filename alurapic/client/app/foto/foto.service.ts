import { FotoComponent } from './foto.component';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FotoService {

    private _url: string;
    private _lista: FotoComponent[] = [];
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http
    ) {
        this._url = 'v1/fotos';
        this._headers.set('content-type', 'application/json');
    }

    getLista(): Observable<FotoComponent[]> {
        return this._http
            .get(this._url)
            .map(res => this._lista = res.json());
    }

    add(foto: FotoComponent): Observable<Response> {
        return this._http
            .post(this._url, JSON.stringify(foto), { headers: this._headers });
    }

    remover(foto: FotoComponent) {

    }
}