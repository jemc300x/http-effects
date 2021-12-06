import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import * as usuariosActions from '../actions';

export interface UsuarioState {
  id     : string | null,
  user   : Usuario | null,
  loaded : boolean,
  loading: boolean,
  error  : any
};

const  usuarioInitialState: UsuarioState = {
  id     : null,
  user   : null,
  loaded : false,
  loading: false,
  error  : null
};

const _usuarioReducer = createReducer(usuarioInitialState,
  on(usuariosActions.cargarUsuario, (state, { id }) => ({...state, loading: true, id: id})),
  on(usuariosActions.cargarUsuarioSucces, (state, {usuario}) => ({
    ...state, 
    loading: false,
    loaded: true,
    user: {...usuario}
  })),
  on(usuariosActions.cargarUsuariosError, (state, {payload}) => ({
    ...state, 
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    }
  })),
);

export function usuarioReducer(state: any, action: any) {
  return _usuarioReducer(state, action)
}