import { Component, Input, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { FotoService } from './../foto/foto.service';
import { FotoComponent } from './../foto/foto.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html',
})
export class CadastroComponent implements OnDestroy {

    form: FormGroup;
    foto: FotoComponent = new FotoComponent();
    private _inscricao: Subscription;
    private _inscricaoRoute: Subscription;

    constructor(
        private _fotoService: FotoService,
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.form = this._fb.group({
            titulo: ['', Validators.compose([
                Validators.required, 
                Validators.minLength(4)
            ])],
            url: ['', Validators.required],
            descricao: [''],
        });

        this._inscricaoRoute = this._route.params
            .subscribe(
                paramns => {
                    const id = paramns['id'];
                    if (id) {
                        this._fotoService
                            .getFotoById(id)
                            .subscribe(
                                foto => this.foto = foto,
                                err => console.error(err)
                            );
                    }
                }
            );
    }

    cadastrar() {
        if(this.form.valid) {
            this._inscricao = this._fotoService
                .add(this.foto)
                .subscribe(
                    mensagem => {
                        console.log('foto salva com sucesso');
                        if (mensagem.inclusao) {
                            this.foto = new FotoComponent();
                        } else {
                            this._router.navigate(['']);
                        }
                    },
                    err => console.error(err)
                );
        } else {
            console.log('Preencha os campos obrigatórios!');
        }
    }

    ngOnDestroy() {
        try {
            this._inscricaoRoute.unsubscribe();
            this._inscricao.unsubscribe();
        } catch (e) { }
    }

}