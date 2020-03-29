export class User {
    public nombre: String;
    public email: String;
    public uid: String;

    constructor(nombre: String, email: String, uid: String){
        this.nombre = nombre;
        this.email = email;
        this.uid = uid;
    }
}