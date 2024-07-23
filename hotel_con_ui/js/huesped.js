export class Huesped {
    constructor(nombre, vip = false) {
        this._nombre = nombre;
        this.vip = vip;
    }
    get nombre() {
        return this._nombre;
    }
    isVip() {
        return this.vip;
    }
    toString() {
        return `Nombre: ${this._nombre} Vip: ${this.vip}`;
    }
    toJSON() {
        return `{"nombre": "${this._nombre}", "vip": "${this.vip}}"`;
    }
}
