import { Component, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: 'listagem.component.html'
})
export class ListagemComponent implements OnDestroy {

    fotos;
    private _incricao: Subscription;

    constructor(
        private _http: Http
    ) {
        this._incricao = this._http
            .get('v1/fotos')
            .map(res => res.json())
            .subscribe(
            fotos => this.fotos = fotos,
            err => console.error(err)
            );
    }

    ngOnDestroy() {
        try {
            this._incricao.unsubscribe();
        } catch (e) { }
    }
}