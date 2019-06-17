import { firestore } from 'firebase';

export class Article {
    constructor(
        public id: string, 
        public nom: string, 
        public description: string, 
        public vendeur: string, 
        public categorie: string, 
        public dateDeMiseEnLigne: string, 
        public ville: string, 
        public prix: string){

    }
}
