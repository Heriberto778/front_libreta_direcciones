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
    apellido_materno: '',
    telefonos: [] as string[],
    emails: [] as string[]
  };

  telefonos = '';
  emails = '';

  constructor(public dialogRef: MatDialogRef<ContactModalComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.contacto.telefonos = this.telefonos.split(',').map(t => t.trim());
    this.contacto.emails = this.emails.split(',').map(e => e.trim());
    this.dialogRef.close(this.contacto);
    console.log('Contacto guardado:', this.contacto);
  }
}
