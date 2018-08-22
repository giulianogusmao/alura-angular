import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { PhotoService } from '../photo/photo.service';
import { NotifyService } from '../../shared/components/notify/notify.service';
import { finalize } from 'rxjs/operators';
import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: any;

  percentUpload: number = 0;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _photoService: PhotoService,
    private _notifyService: NotifyService,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this.photoForm = this._fb.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  upload(): void {
    const data = { ...this.photoForm.getRawValue(), file: this.file };
    this._photoService
      .upload(data.description, data.allowComments, data.file)
      .pipe(finalize(() => {
        this._router.navigate(['/user', this._userService.getUserName()]);
      }))
      .subscribe(
        (event: HttpEvent<any>) => {
        if (event.type == HttpEventType.UploadProgress) { // verifica se está realizando o upload
          this.percentUpload = Math.round(100 * event.loaded / event.total);
        } else if (event.type == HttpEventType.Response) {  // verifica se o upload foi finalizado
          this._notifyService.success('Upload complete', true);
        }
      },
      err => {
        console.error(err);
        this._notifyService.danger('Upload error!', true);
      }
    );
  }

  handleFile(file): void {
    this.file = file;

    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }
}
