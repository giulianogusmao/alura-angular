import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PhotoService } from '../photo/photo.service';

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
  ) { }

  ngOnInit() {
    this.photoForm = this._fb.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allow: [true]
    });
  }

  upload(event) {
    const data = { ...this.photoForm.getRawValue(), file: this.file };
    this._photoService
      .upload(data.description, data.allow, data.file)
      .subscribe(() => this._router.navigate(['']));
  }

  handleFile(file) {
    this.file = file;

    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }
}
