import { firestore } from 'firebase';

export class User {
    id: string;
    mail: string;
    username: string;
    ville: string;
    age: number;

    constructor(id: string, username: string, mail: string, ville: string, age: number) {
        this.id = id;
        this.username = username;
        this.mail = mail;
        this.ville = ville;
        this.age = age;
    }
}
