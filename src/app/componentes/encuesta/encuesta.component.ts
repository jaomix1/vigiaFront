import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from '../baseComponent';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { SolService } from 'src/app/servicios/sol.service';
import { MisSede } from 'src/app/modelos/sede';
import { Encuesta, Pregunta, Respuesta } from 'src/app/modelos/pregunta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent extends BaseFormComponent implements OnInit {
  esPrimeraPregunta : boolean = true;
  esUltimaPregunta : boolean = false;
  misSedes: MisSede[] = null;
  periodo : string = "SIN PERIODO ACTIVO";
  preguntas: Pregunta[] = null;
  encuesta : Encuesta = { SedeId : 0, Respuestas : null };
  preguntaActiva: Pregunta = null;
  varloRespuesta : string ="0";
  observacionRespuesta : string ='';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mys: SolService,
    public dialog: MatDialog
  ) {
    super();
    this.cancelar();
  }

  tamano: any = { col: 1, row: 1 };
  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.tamano = { col: 4, row: 15 };
        } else {
          this.tamano = { col: 4, row: 11 };
        }
      });
  }

  cargarMisSedes(){
    this.loanding = true;
    this.mys.misSedes()
      .subscribe(response => {
        console.log(response)
        this.loanding = false;
        this.misSedes = response;
        this.periodo = response[0].Periodo
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  }

  seleccionarSede(sedeId : number){
    this.encuesta.SedeId = sedeId;
  }

  cargarPreguntas(){
    this.loanding = true;
    this.mys.cargarPreguntas()
      .subscribe(response => {
        this.loanding = false;
        this.preguntas = response;
        this.encuesta.Respuestas =  this.preguntas.map(c => {
          return { Id : c.Id, Valor : 5, Observacion : '' }
        } )
        this.preguntaActiva = this.preguntas[0];
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  }


  guardar(){
    this.loanding = true;
    this.mys.guardarRespuestas(this.encuesta)
      .subscribe(response => {
        this.loanding = false;       
        this.detalles(response.EncuestaId);
      }, error => {
        this.loanding = false;
        this.error(error);
      }, () => {
      })
  }

  anteriorPregunta(){

    this.esUltimaPregunta = false;
    let index =this.preguntas.indexOf(this.preguntaActiva);

    if(index == -1){
      this.esPrimeraPregunta = true;
      this.preguntaActiva = this.preguntas[0];
    }
    else if(index > 0){     
      if(index == 1) 
        this.esPrimeraPregunta = true;

      this.preguntaActiva = this.preguntas[index - 1];
    }

    
    this.recuperarValorPregunta(this.preguntaActiva);
  }

  siguientePregunta(){   
      if(parseInt(this.varloRespuesta) != 5 && this.observacionRespuesta.length == 0)
      {
        this.error("Debe digitar una observacion");
      }
      else{
        this.asignarValorPregunta(this.preguntaActiva);

        let index =this.preguntas.indexOf(this.preguntaActiva);
  
        if(index == -1){      
          this.preguntaActiva = this.preguntas[0];
        }
        else if(index >= 0){
          this.esPrimeraPregunta = false; 
          if(index == (this.preguntas.length -1)){    
            index = this.preguntas.length -2;    
            this.esUltimaPregunta = true;
          }
            
          this.preguntaActiva = this.preguntas[index + 1];
    
        }  
  
        if(!this.esUltimaPregunta)      
          this.resetValorPregunta();
  
        this.recuperarValorPregunta(this.preguntaActiva);
      }
      
         
  }

  asignarValorPregunta(data : Pregunta){
    let index = this.encuesta.Respuestas.findIndex(c=> c.Id == data.Id)
    this.encuesta.Respuestas[index].Valor =  parseInt(this.varloRespuesta);
    this.encuesta.Respuestas[index].Observacion = this.observacionRespuesta;
  }

  recuperarValorPregunta(data : Pregunta){
    let index = this.encuesta.Respuestas.findIndex(c=> c.Id == data.Id)
    this.varloRespuesta = this.encuesta.Respuestas[index].Valor.toString();
    this.observacionRespuesta = this.encuesta.Respuestas[index].Observacion;    
  }

  resetValorPregunta(){
    this.varloRespuesta = "5";
    this.observacionRespuesta = ''
  }

   /**
  * restaura el formulario a valores iniciales
  */
  cancelar() {
    this.encuesta = { SedeId : 0, Respuestas : null };
    this.cargarMisSedes();    
    this.cargarPreguntas();
    this.resetValorPregunta();
    this.esPrimeraPregunta = true;
    this.esUltimaPregunta = false;
  }

  detalles(guid: number) {
    Swal.fire({
      html: '<p style="font-size: small">Respuestas guardadas correctamente <a href="/consultar/' + guid + '" target="_blank">ver...</a></p>',
      width: "50%",
      customClass: {
        popup: 'format-pre'
      }
    }).then(result =>{
      if (!result) throw null;

      if(result.isConfirmed ){
        this.cancelar();
      }else{
        this.cancelar();
      }
    })
  }
}
