import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get(`${this.apiUrl}/users?per_page=6`).pipe(map((resp: any) => resp.data));
  }
  
  getUserById(id: string) {
    return this.http.get(`${this.apiUrl}/users/${id}`).pipe(map((resp: any) => resp.data));
  }
}
