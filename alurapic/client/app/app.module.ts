import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modulos
import { HttpModule } from '@angular/http'
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
        FotoModule,
        PainelModule,
        routing,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
