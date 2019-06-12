import { firestore } from 'firebase';

export interface Article {
    id?: string;
    nom: string;
    description: string;
    vendeur: string;
    categorie: string;
    dateDeMiseEnVille: string;
    ville: string;
    prix: number;
}
