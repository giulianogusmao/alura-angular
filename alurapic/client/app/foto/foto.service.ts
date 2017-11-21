import { FotoComponent } from './foto.component';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Mensagem } from './mensagem';

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

    getFotoById(id: string): Observable<FotoComponent> {
        return this.getLista()
            .map(fotos => {
                try {
                return fotos.filter(foto => foto._id == id)[0];
                } catch (e) {
                    throw new Error('Nenhuma foto encontrada');
                }
            });
    }

    add(foto: FotoComponent): Observable<Mensagem> {
        if (foto._id) {
            return this._http // altera foto cadastrada
                .put(`${this._url}/${foto._id}`, JSON.stringify(foto), { headers: this._headers })
                .map(() => new Mensagem('Foto alterada com sucesso'));
            }
            
            return this._http // inclui nova foto
                .post(this._url, JSON.stringify(foto), { headers: this._headers })
                .map(() => new Mensagem('Foto inclída com sucesso', true));
    }

    remover(foto: FotoComponent): Observable<Response> {
        return this._http
            .delete(`${this._url}/${foto._id}`);
    }
}