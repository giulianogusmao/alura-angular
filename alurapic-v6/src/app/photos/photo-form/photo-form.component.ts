import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PhotoService } from '../photo/photo.service';
import { NotifyService } from '../../shared/components/notify/notify.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: any;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _photoService: PhotoService,
    private _notifyService: NotifyService,
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
      .subscribe(() => {
        this._notifyService.success('Upload complete', true);
        this._router.navigate(['']);
      });
  }

  handleFile(file): void {
    this.file = file;

    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }
}
