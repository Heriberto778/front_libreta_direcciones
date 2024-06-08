// src/app/contactos/contactos.component.ts
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
})

export class ContactosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido_paterno', 'apellido_materno', 'acciones'];
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
    console.log('Editar contacto:', contacto);
  }

  eliminar(id: number): void {
    this.apiService.eliminarContacto(id).subscribe(
      (response) => {
        this.dataSource.data = this.dataSource.data.filter((contacto: any) => contacto.id !== id);
        console.log('Contacto eliminado', response);
      },
      (error) => {
        console.error('Error al eliminar contacto', error);
      }
    );
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
          },
          (error) => {
            console.error('Error al agregar contacto', error);
          }
        );
      }
    });
  }
}