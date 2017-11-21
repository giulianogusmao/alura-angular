import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'botao',
    templateUrl: 'botao.component.html',
})
export class BotaoComponent {
    @Input() estilo: string = 'btn-default';
    @Input() tipo: string = 'button';
    @Input() desabilitado: boolean = false;
    @Input() confirmar: string = '';
    @Output() acao = new EventEmitter();

    executaAcao() {
        if (this.confirmar) {
            if (confirm(this.confirmar)) {
                this.acao.emit(null);
            }
        } else {
            this.acao.emit(null);
        }
    }
}