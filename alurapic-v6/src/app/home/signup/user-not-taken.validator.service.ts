import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, first, map } from 'rxjs/operators';

import { SignupService } from './signup.service';

@Injectable()
export class UserNotTakenValidatorService {

  constructor(
    private _signupService: SignupService
  ) {}

  /**
   * Retorna uma instância de um validator que irá validar se o usuário
   * informado está disponível
   *
   * Para realizar a validação:
   *  - precisamos ler o valor que está sendo digitado;
   *  - determina um tempo minimo para aguardar o "término" da digitação;
   *  - switchMap realiza a troca do observable que está sendo transmitido de digitação (valueChanges)
   *    para o observable do serviço checkUserNameTaken, quer irá aguardar a resposta;
   *  - usa o map para tranformar o valor final
   *  - first realiza o complete do observable
   */
  checkUserNotTaken() {
    return (control: AbstractControl) => {
      return control
        .valueChanges
        .pipe(debounceTime(300))
        .pipe(switchMap(userName => this._signupService.checkUserNameTaken(userName)))
        .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null ))
        .pipe(first());
    };
  }
}
