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

    error(error: string) {
        Swal.fire({
            title: 'Upp!',
            text: error,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }

    calcularColor(data: Respuesta2) {
        data.Valor;
        switch (data.Valor) {
            case 1:
                return 'red'
                break;
            case 2:
                return 'red'
                break;
            case 3:
                return 'orange'
                break;
            case 4:
                return 'yellow'
                break;
            case 5:
                return 'yellow'
                break;
            default:
                return 'red'
                break;
        }
    }
}