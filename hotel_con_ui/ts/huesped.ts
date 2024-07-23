
export class Huesped {
    private _nombre: string;
    private vip: boolean;

    constructor(nombre: string, vip = false) {
        this._nombre = nombre;
        this.vip = vip;
    }

    get nombre(): string {
        return this._nombre;
    }

    isVip(): boolean {
        return this.vip;
    }

    toString(): string {
        return `Nombre: ${this._nombre} Vip: ${this.vip}`;
    }

    toJSON(): string {
        return `{"nombre": "${this._nombre}", "vip": "${this.vip}}"`;
    }
}