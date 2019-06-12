import { firestore } from 'firebase';

export class Article {
    description: string;
    vendeur: string;
    categorie: string;
    dateDeMiseEnVille: string;
    ville: string;
    prix: number;

    constructor(public id: string, public nom: string){

    }
}
