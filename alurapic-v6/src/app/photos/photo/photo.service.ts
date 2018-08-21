import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

import { Photo } from "./photo";
import { Helper } from '../../core/helper/helper';
import { PhotoCommment } from "./photo-comment";
import { map, catchError } from "rxjs/operators";
import { of, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PhotoService {

  constructor(
    private _http: HttpClient
  ) { }

  listFromUser(userName: string) {
    return this._http
      .get<Photo[]>(`${Helper.api}/${userName}/photos`);
  }

  listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams()
      .append('page', page.toString());

    return this._http
      .get<Photo[]>(`${Helper.api}/${userName}/photos`, { params });
  }

  upload(description: string, allowComments: boolean, file: File) {

    // deve-se utilizar um formData para enviar arquivos
    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false'); // formdata só recebe strings, por isso a conversão
    formData.append('imageFile', file);

    return this._http.post(`${Helper.api}/photos/upload`, formData);
  }

  removePhoto(photoId: number) {
    return this._http.delete(`${Helper.api}/photos/${photoId}`);
  }

  findById(photoId: number) {
    return this._http.get<Photo>(`${Helper.api}/photos/${photoId}`);
  }

  getComments(photoId: number) {
    return this._http.get<PhotoCommment[]>(`${Helper.api}/photos/${photoId}/comments`);
  }

  addComment(photoId: number, commentText: string) {
    return this._http.post(`${Helper.api}/photos/${photoId}/comments`, { commentText });
  }

  like(photoId: number) {
    /**
     * A api deste curso não tem suporte a remoção de curtidas(dislike) em uma foto, por isso ela só
     * retorna status 200(conseguiu submeter o like) ou status 304(foto já esteja curtida).
     * Por isso precisamos verificar o status retornado pela api
     * - Caso tenha dado tudo certo apenas retorna true para aplicação
     * - Caso tenha um algum erro:
     *    - verifica se é o 304 e converte para retornar um observable do tipo false
     *    - senão deixa o erro da api passar para aplicação
     */
    return this._http
      .post(`${Helper.api}/photos/${photoId}/like`, {}, { observe: 'response' })
      .pipe(map(() => true))
      .pipe(catchError(err => {
        return err.status == '304' ? of(false) : throwError(err);
      }));
  }
}
