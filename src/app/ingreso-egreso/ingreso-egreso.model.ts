export enum Tipo {
    Ingreso = "Ingreso",
    Egreso = "Egreso"
}

export class IngresoEgreso {
    description: string;
    monto: number;
    tipo: Tipo;
    uid?: string;

    constructor(obj){
        this.description = obj && obj.description || null;
        this.monto = obj && obj.monto || null;
        this.tipo = obj && obj.tipo || null;
        this.uid = obj && obj.uid || null;
    }
}