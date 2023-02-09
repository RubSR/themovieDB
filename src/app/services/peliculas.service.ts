import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GeneroResponse} from "../Models/GeneroResponse";
import {PeliculasResponse} from "../Models/PeliculasResponse";
import {PeliculaDetalle} from "../Models/PeliculaDetalleResponse";

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  set peliculaId(value: number) {
    this._peliculaId = value;

    sessionStorage.setItem('peliculaID', ''+this._peliculaId);
  }


  private _peliculaId = 0;
  //Para llamar  a las api necesito el modulo HttpClient
  constructor(private http: HttpClient) { }

  //Metodo que llama a la api para traerse los generos
  public getGeneros(): Observable<GeneroResponse>{
    const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=2e1d89df49bc88bac53fed92d2ce4597&language=es-Es';

    //Devolver la respuesta de la llamada a la api
    return this.http.get<GeneroResponse>(url);
  }

  public getPeliculas(genero: number, pagina: number): Observable<PeliculasResponse>{
    const url ='https://api.themoviedb.org/3/discover/movie?api_key=2e1d89df49bc88bac53fed92d2ce4597&language=es-ES&sort_by=popularity.desc&'
      +'with_genres='+genero +'&page='+pagina;
    return this.http.get<PeliculasResponse>(url );
  }

  public getPeliculaDetalle(): Observable<PeliculaDetalle>{

    //cuando llame desde detalle compruedo si tengo el id, si no lo tengo
    // lo saco de sessionstorage

    let idpelicula = this._peliculaId;
    if(this._peliculaId == 0){
      idpelicula =  + sessionStorage.getItem('peliculaID')!;
    }
    const _baseUrl= `https://api.themoviedb.org/3/movie/${idpelicula}?api_key=2e1d89df49bc88bac53fed92d2ce4597&language=es-ES`

    return this.http.get<PeliculaDetalle>(_baseUrl);
  }
}
