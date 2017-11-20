import { Component, Input, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { CadastroService } from './cadastro.service';
import { FotoComponent } from './../foto/foto.component';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html',
    providers: [CadastroService],
})
export class CadastroComponent implements OnDestroy {

    foto: FotoComponent = new FotoComponent();
    private _inscricao: Subscription;

    constructor(
        private _cadastroService: CadastroService
    ) { }

    cadastrar() {
        this._inscricao = this._cadastroService
            .add(this.foto)
            .subscribe(
                () => {
                    console.log('foto salva com sucesso');
                    this.foto = new FotoComponent();
                },
                err => console.error(err)
            )
    }

    ngOnDestroy() {
        try {
            this._inscricao.unsubscribe();
        } catch (e) { }
    }

}