import {Component, Input} from '@angular/core';
import {Pelicula} from "../../Models/PeliculasResponse";

@Component({
  selector: 'app-pelicula-card',
  templateUrl: './pelicula-card.component.html',
  styleUrls: ['./pelicula-card.component.scss']
})
export class PeliculaCardComponent {

  //Establece que va a recibir por parametro una pelicula
  // podemos recibir todos los input que queramos
  @Input() pelicula? : Pelicula;

}
