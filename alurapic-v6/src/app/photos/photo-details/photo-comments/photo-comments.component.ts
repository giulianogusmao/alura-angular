import { OnInit, Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { switchMap, tap } from "rxjs/operators";

import { PhotoService, PhotoCommment } from "../../photo";

@Component({
  selector: 'app-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.css']
})
export class PhotoCommentComponent implements OnInit {

  @Input() photoId: string;
  comments$: Observable<PhotoCommment[]>;
  commentForm: FormGroup;

  constructor(
    private _photoService: PhotoService,
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.comments$ = this._photoService.getComments(this.photoId);

    this.commentForm = this._fb.group({
      'comment': [
        '',
        Validators.compose([
          Validators.maxLength(300),
          Validators.required
        ]),
      ]
    });
  }

  save(): void {

    this.comments$ = this._photoService
      .addComment(this.photoId, this.commentForm.get('comment').value)
      .pipe(switchMap(() =>
        this._photoService.getComments(this.photoId)
      ))
      .pipe(tap(() => {
        this.commentForm.reset();
        alert('comentário adicionado com sucesso!');
      }));
  }
}
