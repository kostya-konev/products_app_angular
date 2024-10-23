import { Component, OnInit, Inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})

export class DialogBoxComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (this.data) this.isNew = false
  }

  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? ''),
    price: new FormControl(this.data?.price ?? ''),
    year: new FormControl(this.data?.year ?? ''),
    chip: new FormControl(this.data?.details?.chip ?? ''),
    SSD: new FormControl(this.data?.details?.SSD ?? ''),
    memory: new FormControl(this.data?.details?.memory ?? ''),
    display: new FormControl(this.data?.details?.display ?? ''),
  });

  isNew: boolean = true;

  onSubmit() {
    this.data = {}
    if (this.myForm.value.id) {
      this.data = {
        id: this.myForm.value.id,
        title: this.myForm.value.title,
        price: this.myForm.value.price,
        year: this.myForm.value.year,
        image: "assets/images/macbook.jpeg",
        details: {
          chip: this.myForm.value.chip,
          SSD: this.myForm.value.SSD,
          memory: this.myForm.value.memory,
          display: this.myForm.value.display,
        }
      };
    } else {
      this.data = {
        title: this.myForm.value.title,
        price: this.myForm.value.price,
        year: this.myForm.value.year,
        image: "assets/images/macbook.jpeg",
        details: {
          chip: this.myForm.value.chip,
          SSD: this.myForm.value.SSD,
          memory: this.myForm.value.memory,
          display: this.myForm.value.display,
        }
      };
    }

    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  ngOnInit(): void {
  }
}
