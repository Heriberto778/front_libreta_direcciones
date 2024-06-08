// src/app/contactos/contactos.component.ts
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
})

export class ContactosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido_paterno', 'apellido_materno', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService) { }

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
    console.log('Agregar nuevo contacto');
  }
}