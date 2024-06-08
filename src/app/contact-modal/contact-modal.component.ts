import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../servicios/api.service';

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
    emails: [] as string[],
    direcciones: [] as string[]
  };

  telefonos = '';
  emails = '';
  direcciones = '';
  isEditMode = false;

  constructor(
    public dialogRef: MatDialogRef<ContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService // Usa ApiService en lugar de ContactService
  ) {
    if (data && data.contacto) {
      this.isEditMode = true;
      this.contacto = { ...data.contacto };
      this.telefonos = this.unifyContactInfo(this.contacto.telefonos, 'telefono');
      this.emails = this.unifyContactInfo(this.contacto.emails, 'email');
      this.direcciones = this.unifyContactInfo(this.contacto.direcciones, 'direccion');
    }
  }
  unifyContactInfo(dataArray: any[], key: string): string {
    return dataArray ? dataArray.map(item => item[key]).join(', ') : '';
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.contacto.telefonos = this.telefonos.split(',').map(t => t.trim());
    this.contacto.emails = this.emails.split(',').map(e => e.trim());
    this.contacto.direcciones = this.direcciones.split(',').map(d => d.trim());
    
    if (this.isEditMode) {
      this.actualizarContacto();
    } else {
      this.agregarContacto();
    }
  }

  agregarContacto(): void {
    this.apiService.agregarContacto(this.contacto).subscribe({
      next: response => {
        console.log('Contacto agregado:', response);
        this.dialogRef.close(this.contacto);
      },
      error: error => {
        console.error('Error al agregar contacto:', error);
        // Aquí puedes mostrar un mensaje de error si es necesario
      }
    });
  }

  actualizarContacto(): void {
    console.log("aaaa",this.contacto)
    this.apiService.updateContact(this.contacto).subscribe({
      next: response => {
        console.log('Contacto actualizado:', response);
        this.dialogRef.close(this.contacto);
      },
      error: error => {
        console.error('Error al actualizar contacto:', error);
        // Aquí puedes mostrar un mensaje de error si es necesario
      }
    });
  }
}
