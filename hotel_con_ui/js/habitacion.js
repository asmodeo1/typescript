export class Habitacion {
    constructor(numero, camas, ocupada = false, huesped = null, fechaEntrada = null, fechaSalida = null) {
        this._ocupada = false;
        this._huesped = null;
        this._fechaEntrada = null;
        this._fechaSalida = null;
        this._numero = numero;
        this._camas = camas;
        this._ocupada = ocupada;
        this._fechaEntrada = fechaEntrada;
        this._fechaSalida = fechaSalida;
        this._huesped = huesped;
    }
    get numero() {
        return this._numero;
    }
    get camas() {
        return this._camas;
    }
    get huesped() {
        return this._huesped;
    }
    set huesped(huesped) {
        this._huesped = huesped;
    }
    isOcupada() {
        return this._ocupada;
    }
    /**
     * @param {boolean} ocupada
     */
    set ocupada(ocupada) {
        this._ocupada = ocupada;
    }
    get fechaEntrada() {
        return this._fechaEntrada;
    }
    get fechaSalida() {
        return this._fechaSalida;
    }
    set fechaEntrada(fecha) {
        this._fechaEntrada = fecha;
    }
    set fechaSalida(fecha) {
        this._fechaSalida = fecha;
    }
    toString() {
        return `Número: ${this._numero} Camas: ${this._camas} Ocupada: ${this._ocupada}`
            + `Huesped: ${this._huesped.nombre} Fecha entrada: ${this._fechaEntrada} Fecha salida: ${this._fechaSalida}`;
    }
    toJSON() {
        const fechaEntrada = this._fechaEntrada != null ? `"${this._fechaEntrada}"` : null;
        const fechaSalida = this._fechaSalida != null ? `"${this._fechaSalida}"` : null;
        const huesped = this._huesped != null ? `"${this._huesped.nombre}"` : null;
        return `{"numero": ${this.numero}, "camas": ${this.camas}, "ocupada": ${this._ocupada}`
            + `,"huesped": ${huesped}`
            + `, "fechaEntrada": ${fechaEntrada}`
            + `, "fechaSalida": ${fechaSalida}}`;
    }
}
