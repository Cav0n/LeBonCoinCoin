import { firestore } from 'firebase';
import { User } from './User';

export class Article {

    ville: string;
    dateDeMiseEnLigne: Date;

    constructor(
        public nom: string,
        public description: string,
        public vendeur: User,
        public categorie: string,
        public prix: number) {
            this.nom = nom;
            this.description = description;
            this.categorie = categorie;
            this.vendeur = vendeur;
            this.prix = prix;
            this.ville = vendeur.ville;
            this.dateDeMiseEnLigne = new Date();
    }
}
