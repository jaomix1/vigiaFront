
  export class Pregunta {
    Id: number;
    Descripcion: string;
    Orden: number;
  }

  export class Respuesta {
    Id: number;
    Valor: number;
    Observacion : string;
  }

  export class Encuesta{
    SedeId : number;
    Respuestas : Respuesta[]
  }

  export class Respuesta2 extends Respuesta {
    Orden : number;
    Pregunta : string;
  }

  export class Respuesta3 extends Respuesta2 {
   
    Priorizacion : string;
    Limite : string;
    Programacion : string;
    Delegada : string;
    Indicador : string;
    Cumplimiento : string;
    Comentario : string;
  }


  export class Encuesta2 {
    EncuestaId : number
    SedeId : number;
    Sede : string;
    PeriodoId : number;
    Periodo : string;
    Usuario : string;
  }