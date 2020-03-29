export class User {
    public nombre: String;
    public email: String;
    public uid: String;

    constructor(obj: DataObj){
        this.nombre = obj && obj.nombre || null;
        this.email = obj && obj.email || null;
        this.uid = obj && obj.uid || null;
    }
}

interface DataObj {
    uid: string;
    nombre: string;
    email: string;
}