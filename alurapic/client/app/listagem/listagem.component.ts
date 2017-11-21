import { Component, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';

import { Subscription } from 'rxjs/Subscription';
import { FotoService } from './../foto/foto.service';

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: 'listagem.component.html'
})
export class ListagemComponent implements OnDestroy {

    fotos;
    private _incricao: Subscription;

    constructor(
        private _http: Http,
        private _fotoService: FotoService
    ) {
        this._incricao = this._fotoService
            .getLista()
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