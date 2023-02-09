import {Component, OnInit, ViewChild} from '@angular/core';
import {PeliculasService} from "../../services/peliculas.service";
import {Genre} from "../../Models/GeneroResponse";
import {MatSelectChange} from "@angular/material/select";
import {Pelicula} from "../../Models/PeliculasResponse";
import {Router} from "@angular/router";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


  generos : Genre[] = [];
  peliculas: Pelicula[] = [];
  resultadosTotal= 0;
  paginaActual = 0;
  paginasTotal = 0;

  generoId= 0;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  esconder = false
  constructor(private peliculaService: PeliculasService, private router: Router) {
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
    this.peliculaService.getPeliculas($event.value , 1).subscribe({
      next: value => {
        this.generoId = $event.value;
        this.peliculas = value.results;
        this.resultadosTotal = value.total_results;
        this.paginaActual = value.page;
        this.paginasTotal = value.total_pages;
        //Poner a cero la paginacion cuando cambio de genero
        this.paginator?.firstPage();
        console.log(this.peliculas);
      },
      error: err => {
        console.log(err);
      }

    });
  }

  navegarADetalle($event: number) {
    //Vamos a pasar el id de la pelicula al service
    //LLamaremos a la api para que traiga la info completa de la pelicula
    this.peliculaService.peliculaId = $event;
    //Navegamos  a detalle con el Router
    this.router.navigate(['detalle']);
  }

  paginaSiguiente($event: PageEvent) {
    console.log($event);
    //page + 1 -> pageIndex
    this.peliculaService.getPeliculas(this.generoId, $event.pageIndex +1).subscribe({
      next: value => {
        this.peliculas = value.results;
        this.resultadosTotal = value.total_results;
        this.paginaActual = value.page;
        this.paginasTotal = value.total_pages;
        console.log(this.peliculas);
      },
      error: err => {
        console.log(err);
      }

    });
  }

  mostrar() {
    this.esconder = !this.esconder;
  }
}
