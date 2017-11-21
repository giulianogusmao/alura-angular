import { NgModule } from '@angular/core';
import { BotaoModule } from './botao/botao.module';

@NgModule({
    imports: [
        BotaoModule,
    ],
    exports: [
        BotaoModule,
    ],
    providers: []
})
export class SharedModule { }