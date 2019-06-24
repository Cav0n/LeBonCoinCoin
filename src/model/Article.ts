import { firestore } from 'firebase';
import { User } from './User';

export class Article {

    dateDeMiseEnLigne: Date;
    id?: string;

    constructor(
        public nom: string,
        public description: string,
        public vendeur: string,
        public categorie: string,
        public prix: number,
        public ville: string) {
            this.nom = nom;
            this.description = description;
            this.categorie = categorie;
            this.vendeur = vendeur;
            this.prix = prix;
            this.ville = ville;
            this.dateDeMiseEnLigne = new Date();
    }
}
