import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://34.203.236.22:8003/api/contactos/';

  constructor(private http: HttpClient) { }

  getContactos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}obtener-todo`);
  }

  eliminarContacto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}eliminar/${id}`);
  }
  agregarContacto(contacto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}crear`, contacto);
  }
  updateContact(contact: any): Observable<any> {
    return this.http.put(`${this.apiUrl}actualizar/${contact.id}`, contact);
  }

}
