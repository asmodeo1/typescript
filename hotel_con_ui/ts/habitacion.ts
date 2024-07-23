import { Huesped } from "./huesped.js";

export class Habitacion {
    private _numero: number;
    private _camas: number;
    private _ocupada = false;
    private _huesped: Huesped | null = null;
    private _fechaEntrada: string | null = null;
    private _fechaSalida: string | null = null;

    constructor(numero: number, camas: number, ocupada = false, huesped: Huesped | null = null, fechaEntrada: string | null = null, fechaSalida: string | null  = null) {
        this._numero = numero;
        this._camas = camas;
        this._ocupada = ocupada;
        this._fechaEntrada = fechaEntrada;
        this._fechaSalida = fechaSalida;
        this._huesped = huesped;
    }

    get numero(): number {
        return this._numero;
    }

    get camas(): number {
        return this._camas;
    }

    get huesped(): Huesped | null {
        return this._huesped;
    }

    set huesped(huesped: Huesped | null) {
        this._huesped = huesped;
    }

    isOcupada(): boolean {
        return this._ocupada;
    }

    /**
     * @param {boolean} ocupada
     */
    set ocupada(ocupada: boolean) {
        this._ocupada = ocupada;
    }

    get fechaEntrada(): string | null {
        return this._fechaEntrada;
    }

    get fechaSalida(): string | null {
        return this._fechaSalida;
    }
    
    set fechaEntrada(fecha: string | null) {
        this._fechaEntrada = fecha;
    }

    set fechaSalida(fecha: string | null) {
        this._fechaSalida = fecha;
    }

    toString(): string {
        return `Número: ${this._numero} Camas: ${this._camas} Ocupada: ${this._ocupada}`
            + `Huesped: ${this._huesped!.nombre} Fecha entrada: ${this._fechaEntrada} Fecha salida: ${this._fechaSalida}`;
    }

    toJSON(): string {
        const fechaEntrada = this._fechaEntrada != null ? `"${this._fechaEntrada}"` : null
        const fechaSalida = this._fechaSalida != null ? `"${this._fechaSalida}"`  : null;
        const huesped =  this._huesped != null? `"${this._huesped.nombre}"` : null;

        return `{"numero": ${this.numero}, "camas": ${this.camas}, "ocupada": ${this._ocupada}`
            + `,"huesped": ${huesped}`
            + `, "fechaEntrada": ${fechaEntrada}`
            + `, "fechaSalida": ${fechaSalida}}`;
    }
}