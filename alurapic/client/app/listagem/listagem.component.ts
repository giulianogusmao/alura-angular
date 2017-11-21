import { Component, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';

import { Subscription } from 'rxjs/Subscription';
import { FotoService } from './../foto/foto.service';
import { FotoComponent } from './../foto/foto.component';

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: 'listagem.component.html'
})
export class ListagemComponent implements OnDestroy {

    public fotos: FotoComponent[];
    private _incricao: Subscription;
    public mensagem: string;
    private _timerMensagem;

    constructor(
        private _http: Http,
        private _fotoService: FotoService
    ) {
        this.listarFotos();
    }

    public listarFotos() {
        this._incricao = this._fotoService
            .getLista()
            .subscribe(
                fotos => this.fotos = fotos,
                err => this._printMsg('Não foi possível carregar as fotos.', err, true)
            );
    }

    public trackByFnFoto(index: number, item: FotoComponent) {
        return item._id; // index or item.id
    }

    public remover(foto: FotoComponent) {
        this._incricao = this._fotoService
            .remover(foto)
            .subscribe(
                () => {
                    const index = this.fotos.indexOf(foto);
                    this.fotos.splice(index, 1);
                    this._printMsg('Foto removida com sucesso!');
                },
                err => this._printMsg('Não foi remover a foto.', err, true)
            );
    }

    private _printMsg(msg: string, msgConsole: string = '', isError: boolean = false) {
        if (msg) {
            this.mensagem = msg;
            clearTimeout(this._timerMensagem);
            this._timerMensagem = setTimeout(() => {
                this.mensagem = '';
            }, 3000);
        }

        if (msgConsole) {
            console[isError ? 'error' : 'log'](msgConsole);
        }
    }

    ngOnDestroy() {
        try {
            this._incricao.unsubscribe();
        } catch (e) { }
    }
}