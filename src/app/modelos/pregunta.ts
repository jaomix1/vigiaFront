
export class Pregunta {
  Id: number;
  Descripcion: string;
  Orden: number;
  Tipo: string;
}

export class Respuesta {
  Id: number;
  Valor: number;
  Valor2: string | null = '';
  Observacion: string;
}

export class Encuesta {
  SedeId: number;
  Respuestas: Respuesta[]
}

export class Respuesta2 extends Respuesta {
  Orden: number;
  Pregunta: string;
  Tipo: string;
}


export class Respuesta3 extends Respuesta2 {

  Priorizacion: string;
  Limite: Date;
  Delegada: string;
  Indicador: string;
  Cumplimiento: string;
  Comentario: string;
}

export class Respuesta4 extends Respuesta3 {
  DelegadoId: number;
  RealizacionTentativa: Date;
}


export class Encuesta2 {
  EncuestaId: number
  SedeId: number;
  Sede: string;
  EmpresaId: number;
  Empresa: string;
  PeriodoId: number;
  Periodo: string;
  Usuario: string;
}


export class Asignada {
  EmpresaId: number;
  Empresa: string;
  SedeId: number;
  Sede: string;
  EncuestaId: number;
  Id: number;
  Orden: number;
  Pregunta: string;
  Valor: number;
  Observacion: string;
  Limite: Date;
  Realizacion: Date;
}
