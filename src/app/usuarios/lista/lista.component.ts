import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { cargarUsuarios } from 'src/app/store/actions';
import { Usuario } from '../../models/usuario.model';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  private destroy$: Subject<void> = new Subject<void>();
  loading = false;
  error: any;

  constructor(public store: Store<AppState>) { }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.store.select('usuarios')
      .pipe(takeUntil(this.destroy$))
      .subscribe(({users, loading, error}) => {
        this.usuarios = users;
        this.loading = loading;
        this.error = error;
      });
    
    this.store.dispatch(cargarUsuarios());
  }

}
