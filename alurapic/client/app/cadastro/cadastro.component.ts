import { Component, Input, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { FotoService } from './../foto/foto.service';
import { FotoComponent } from './../foto/foto.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html',
})
export class CadastroComponent implements OnDestroy {

    form: FormGroup;
    foto: FotoComponent = new FotoComponent();
    private _inscricao: Subscription;

    constructor(
        private _fotoService: FotoService,
        private _fb: FormBuilder
    ) {
        this.form = this._fb.group({
            titulo: ['', Validators.compose([
                Validators.required, 
                Validators.minLength(4)
            ])],
            url: ['', Validators.required],
            descricao: [''],
        });
    }

    cadastrar() {
        if(this.form.valid) {
            this._inscricao = this._fotoService
                .add(this.foto)
                .subscribe(
                    () => {
                        console.log('foto salva com sucesso');
                        this.foto = new FotoComponent();
                    },
                    err => console.error(err)
                );
        } else {
            console.log('Preencha os campos obrigatórios!');
        }
    }

    ngOnDestroy() {
        try {
            this._inscricao.unsubscribe();
        } catch (e) { }
    }

}