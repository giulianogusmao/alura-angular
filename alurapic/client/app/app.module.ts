import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import 'rxjs/add/operator/map';

// modulos
import { HttpModule } from '@angular/http'
import { SharedModule } from './shared/shared.module';
import { FotoModule } from './foto/foto.module';
import { PainelModule } from './painel/painel.module';
import { routing } from './app.router.module';

// components
import { AppComponent } from './app.component';
import { ListagemComponent } from './listagem/listagem.component';
import { CadastroComponent } from './cadastro/cadastro.component';

@NgModule({
    declarations: [
        AppComponent,
        ListagemComponent,
        CadastroComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        SharedModule,
        FotoModule,
        PainelModule,
        FormsModule,
        routing,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
