import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent {
  contacto = {
    nombre: '',
    apellido_paterno: '',
    apellido_materno: ''
  };

  constructor(public dialogRef: MatDialogRef<ContactModalComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.contacto);
  }
}
