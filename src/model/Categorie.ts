export enum Categorie {
    Jardin = 'Jardin et piscine',
    Informatique = 'Informatique',
    Telephone = 'Téléphone et objet connecté',
    Tv = 'Tv, son & hifi',
    Photo = 'Photo & caméra',
    Electromenager = 'Electroménager',
    Bebe = 'Bébé',
    Cuisine = 'Cuisine & art de la table',
    Maison = 'Maison, déco& & linge',
    Bricolage = 'Bricolage & domotique',
    Mode = 'Mode, beauté & bagagerie',
    Sport = 'Sports, loisirs & voyages',
    Auto = 'Auto & moto',
    Jeux = 'Jeux & jouets',
    JeuxVideo = 'Jeux vidéo & consoles'
}

export function enumSelector(definition: any) {
    return Object.keys(definition)
      .map(key => ({ value: definition[key], title: key }));
  }