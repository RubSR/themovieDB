import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Output() clickDetalle: EventEmitter<number> = new EventEmitter<number>();

  //Una vez creado el evento para que se dispare tenemos que emitir
  //Emitiremos cuando se clique el boton de ver detalle

  irADetalle(){
    //Disparar/emitir el evento
    this.clickDetalle.emit(this.pelicula?.id);
  }
}
