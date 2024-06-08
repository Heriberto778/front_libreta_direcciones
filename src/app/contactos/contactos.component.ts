// src/app/contactos/contactos.component.ts
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
})

export class ContactosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido_paterno', 'apellido_materno', 'telefono', 'email', 'direccion',  'acciones'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getContactos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getContactos(): void {
    this.apiService.getContactos().subscribe(
      (response) => {
        this.dataSource.data = response;
      },
      (error) => {
        console.error('Error al obtener contactos', error);
      }
    );
  }

  editar(contacto: any): void {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      width: '300px',
      data: { contacto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(c => c.id === contacto.id);
        if (index !== -1) {
          this.getContactos();
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data];
        }
      }
    });
  }

  eliminar(id: number): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '300px',
      data: { message: '¿Estás seguro de que deseas eliminar este contacto?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result) {
          this.apiService.eliminarContacto(id).subscribe({
            next: () => {
              console.log('Contacto eliminado');
              Swal.fire('Exitoso!', 'Contacto eliminado exitosamente.', 'success');
              this.getContactos();
            },
            error: error => {
              console.error('Error al eliminar contacto:', error);
              Swal.fire('Error!', 'Error al eliminar contacto.', 'error');
            }
          });
        }
      }
    });
  }

  agregar(): void {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe((contacto) => {
      if (contacto) {
        this.apiService.agregarContacto(contacto).subscribe(
          (response) => {
            this.dataSource.data.push(response);
            this.dataSource._updateChangeSubscription();
            Swal.fire('Exitoso!', 'Contacto Agregado exitosamente.', 'success');
            this.getContactos();
          },
          (error) => {
            Swal.fire('Error!', 'Error al agregar contacto.', 'error');
            console.error('Error al agregar contacto', error);
          }
        );
      }
    });
  }
}