import Swal from 'sweetalert2';
import { Respuesta2 } from '../modelos/pregunta';

export class BaseFormComponent {
    public loanding: boolean = false;
    public loanding2: boolean = false;

    constructor() {

    }

    getErrorMessage(dato: string) {
        switch (dato) {
            case 'user':
                return 'Debes ingresar un usuario';
                break;
            case 'pass':
                return 'Debes ingresar una contraseña';
                break;
            case 'email':
                return 'Debes ingresar un correo valido';
                break;
            case 'rpass':
                return '';
                break;
            default:
                return 'Falta el campo: ' + dato;
                break;
        }
    }

    fechaHoy() {
        const currentDate = new Date();
        return currentDate.toISOString().substring(0, 10);
    }

    /**
   * 
   * @param daysToAdd 
   * @param zone default value 5 colombia, cambiar si esta en la nube el servidor
   * @returns 
   */
    fechaHoyMasDias(daysToAdd: number, zone: number = 5) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + daysToAdd);
        return currentDate.toISOString().substring(0, 10) + "T0" + zone + ":00:00.000Z"; // ojo + "t para servidores colombia"
    }

    diaInicialMes() {
        var dias = new Date().getDate() - 1;
        return this.fechaHoyMasDias(-dias);
    }

    error(error: string) {
        Swal.fire({
            title: 'Upp!',
            text: error,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }

    calcularColor(data: Respuesta2) {
        switch (data.Valor2) {
            case '1':
                return 'red'
                break;
            case '2':
                return 'red'
                break;
            case '3':
                return 'orange'
                break;
            case '4':
                return 'yellow'
                break;
            case '5':
                return 'yellow'
                break;
            case 'SI':
                return 'yellow'
                break;
            default:
                return 'red'
                break;
        }
    }
}