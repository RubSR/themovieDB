import {Component, OnInit} from '@angular/core';
import {PeliculasService} from "../../services/peliculas.service";
import {Genre} from "../../Models/GeneroResponse";
import {MatSelectChange} from "@angular/material/select";
import {Pelicula} from "../../Models/PeliculasResponse";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


  generos : Genre[] = [];
  peliculas: Pelicula[] = [];

  constructor(private peliculaService: PeliculasService) {
  }

  ngOnInit() {
    //Llamare al metodo del servicio para llamar a la api
    this.traerGeneros();
  }

  private traerGeneros(){
    this.peliculaService.getGeneros().subscribe( {
      //Objeto con las 3 propiedades.
      //next -> Cuando ha sido ok
      next: value => {
        //Guardarnos los datos
        this.generos = value.genres;
        console.log(this.generos);
      },
      //error -> en la variable err se guarda el mensaje
      error: err =>{
        //Mostrar un mensaje de error al usuario ... etc
        console.log(err)
      },
      //Se ejecuta siempre aunque exista error
      complete: ()=>{
        //Logica que siempre se ejecuta
    }
    });
  }

  cambiarGenero($event: MatSelectChange) {
    //LLamar a la api y decirle que me devulva las peliculas del genero seleccionado
    this.peliculaService.getPeliculas($event.value).subscribe({
      next: value => {
        this.peliculas = value.results;
        console.log(this.peliculas);
      },
      error: err => {
        console.log(err);
      }

    });
  }
}
