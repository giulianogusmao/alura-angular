import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'foto',
    templateUrl: './foto.component.html',
    styleUrls: [
        './foto.style.css'
    ],
})
export class FotoComponent {
    @Input() titulo: string;
    @Input() url: string;
    descricao: string;
    _id: number;
}