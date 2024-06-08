import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8000/api/contactos/obtener-todo'; // URL de la API que quieres consumir

  constructor(private http: HttpClient) { }

  getContactos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  eliminarContacto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  agregarContacto(contacto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, contacto);
  }

}
