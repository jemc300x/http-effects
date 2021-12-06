import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  usuario!: Usuario | null;
  error: any;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.store.select('usuario').subscribe(({ user, loading, error }) => {
      this.usuario = user;
      this.error = error;
      this.loading = loading;
    })

    this.route.params.subscribe(({id}) => {
      console.log('ID', id);
      this.store.dispatch(cargarUsuario({ id }))
    })
  }

}
