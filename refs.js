// LES RÉFS DU JEU — ajoute tes mèmes ici.
// image   : le mème (jpg, png, gif ou svg), à mettre dans le dossier refs/
// son     : l'extrait audio (mp3), dans refs/ ; debut = seconde où l'extrait commence
// titre   : le nom affiché sur les boutons de choix (et à la révélation)
// Mode pixel : réfs avec image. Mode son : réfs avec son. Mode associer : réfs avec image ET son.
// Les 5 mauvais choix sont tirés au hasard parmi les autres réfs. À la fin de la manche : l'image nette + son son.
//
// Exemple pour un vrai mème :
// { titre: 'Nom du mème', image: 'refs/mon-meme.jpg', son: 'refs/mon-meme.mp3', debut: 0 },
//
// En attendant tes mèmes : réfs de démo faites avec les stickers MétéOG,
// et des comptines du domaine public jouées par le navigateur (melodie = notes, :2 = note deux fois plus longue).
const REFS = [
  { titre: 'Le soleil', image: 'assets/01_icone_soleil.svg' },
  { titre: 'Le nuage', image: 'assets/03_icone_nuage.svg' },
  { titre: 'Il pleut, il mouille', image: 'assets/04_icone_pluie.svg',
    melodie: 'G4 G4 E4 A4 G4 E4 G4 G4 E4 A4 G4:2 E4:2 G4 G4 E4 A4 G4 E4 G4 E4 A4 G4 E4:4' },
  { titre: 'L’orage', image: 'assets/05_icone_orage.svg' },
  { titre: 'La neige', image: 'assets/06_icone_neige.svg' },
  { titre: 'L’arc-en-ciel', image: 'assets/09_icone_arc_en_ciel.svg' },
  { titre: 'La canicule', image: 'assets/10_icone_thermometre_chaud.svg' },
  { titre: 'Au clair de la lune', image: 'assets/12_icone_lune.svg',
    melodie: 'C4 C4 C4 D4 E4:2 D4:2 C4 E4 D4 D4 C4:4 C4 C4 C4 D4 E4:2 D4:2 C4 E4 D4 D4 C4:4' },
  { titre: 'Vive le vent', image: 'assets/07_icone_vent.svg',
    melodie: 'E4 E4 E4:2 E4 E4 E4:2 E4 G4 C4 D4 E4:4 F4 F4 F4 F4 F4 E4 E4 E4 E4 D4 D4 E4 D4:2 G4:2' },
  { titre: 'Nuageux', image: 'assets/02_icone_soleil_nuage.svg' },
];

// PHOTOS DE PROFIL — remplace par vos dessins de mèmes (mettez-les dans refs/ ou assets/)
const AVATARS = [
  'assets/METEOG_symbole.svg', 'assets/01_icone_soleil.svg', 'assets/02_icone_soleil_nuage.svg', 'assets/03_icone_nuage.svg',
  'assets/04_icone_pluie.svg', 'assets/05_icone_orage.svg', 'assets/06_icone_neige.svg', 'assets/07_icone_vent.svg',
  'assets/09_icone_arc_en_ciel.svg', 'assets/10_icone_thermometre_chaud.svg', 'assets/12_icone_lune.svg',
];
