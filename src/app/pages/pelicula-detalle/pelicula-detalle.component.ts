import {Component, OnInit} from '@angular/core';
import {PeliculaDetalle} from "../../Models/PeliculaDetalleResponse";
import {PeliculasService} from "../../services/peliculas.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pelicula-detalle',
  templateUrl: './pelicula-detalle.component.html',
  styleUrls: ['./pelicula-detalle.component.scss']
})
export class PeliculaDetalleComponent implements OnInit{

  pelicula: PeliculaDetalle | undefined;

  constructor(private peliculasService: PeliculasService, private router: Router) {

  }

  ngOnInit() {
  this.getPelicula();
  }

  private getPelicula(){
    this.peliculasService.getPeliculaDetalle().subscribe(
      {
        next : value  =>{
            this.pelicula = value;
            console.log(this.pelicula);
            },
        error: err =>{
          console.log(err);
          this.router.navigate(['home']);
        },
        complete: () => {
          console.log('Completado')
        }
      });
  }
}
