import { firestore } from 'firebase';

export class Article {
    id?: string;
    nom: string;
    description: string;
    vendeur: string;
    categorie: string;
    dateDeMiseEnVille: string;
    ville: string;
    prix: number;
}
