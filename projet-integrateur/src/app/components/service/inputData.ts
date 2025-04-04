// ========================== INTERFACES ==========================

export interface Job {
    readonly id: number;
    readonly location: [number, number];
    readonly service: number;
    readonly delivery: number[];
    readonly address: string;
    readonly nom_client: string;
  }
  
  export interface Vehicle {
    readonly id: number;
    readonly profile: string;
    readonly start: [number, number];
    readonly end: [number, number];
    readonly capacity: number[];
    readonly time_window: [number, number];
  }
  
  export interface InputData {
    readonly jobs: Job[];
    readonly vehicles: Vehicle[];
  }
  
  export interface Livreur {
    trigramme: string;
    prenom: string;
    nom: string;
    email: string;
    vehicleId: number; // identifiant du véhicule associé
  }
  
  
  export interface Tournee {
    readonly vehicle: Vehicle;
    readonly livreurs: Livreur[];
  }
  
  // ========================== LIVREURS ==========================
  
  export const livreurs: Livreur[] = [
    {
      trigramme: 'EBD',
      prenom: 'Élisa',
      nom: 'BERAND',
      email: 'ebd@mobilis.fr',
      vehicleId: 123
    },
    {
      trigramme: 'SWL',
      prenom: 'Sophie',
      nom: 'WHEEL',
      email: 'swl@mobilis.fr',
      vehicleId: 123
    },
    {
      trigramme: 'MPK',
      prenom: 'Marja',
      nom: 'POLIK',
      email: 'mpk@mobilis.fr',
      vehicleId: 456
    },
    {
      trigramme: 'CMJ',
      prenom: 'Citeb',
      nom: 'MARUJ',
      email: 'cmj@mobilis.fr',
      vehicleId: 456
    },
    {
      trigramme: 'MKR',
      prenom: 'Malik',
      nom: 'KEPLER',
      email: 'mkr@mobilis.fr',
      vehicleId: 789
    },
    {
      trigramme: 'OET',
      prenom: 'Olga',
      nom: 'EKKART',
      email: 'oet@mobilis.fr',
      vehicleId: 789
    }
  ];
  
  // ========================== DONNÉES PRINCIPALES ==========================
  
  export const requeteData: InputData = {
    jobs: [
      { id: 1, service: 300, location: [5.723657, 45.107609], delivery: [1], address: "10 Chemin du Foulet - Champagnier 33800", nom_client: "amanda BOIS" },
      { id: 2, service: 300, location: [5.695172, 45.184334], delivery: [1], address: "3 Rue Laurent Drave - Seyssinet 38170", nom_client: "alicia GUYOT" },
      { id: 3, service: 300, location: [5.684798, 45.206066], delivery: [1], address: "6 Rue de Chamechaude 38360 Sassenage", nom_client: "amir IBRAHIM" },
      { id: 4, service: 300, location: [5.72195, 45.25666], delivery: [1], address: "332 Route de la Jars 38950 Quaix-en-Chartreuse", nom_client: "agathe MARTIN" },
      { id: 5, service: 300, location: [5.672983, 45.187277], delivery: [1], address: "9 Chemin des Vouillants 38600 Fontaine", nom_client: "leyla MOHAMMED" },
      { id: 6, service: 300, location: [5.648892, 45.21449], delivery: [1], address: "19 Chemin du Petit Bois 38360 Sassenage", nom_client: "bastien MOREL" },
      { id: 7, service: 300, location: [5.80471, 45.234571], delivery: [1], address: "55 Clos des Franquieres 38330 Biviers", nom_client: "claire DUPUIT" },
      { id: 8, service: 300, location: [5.830537, 45.255762], delivery: [1], address: "131 Chemin du Bois 38330 Saint-Ismier", nom_client: "clara HENRY" },
      { id: 9, service: 300, location: [5.672431, 45.19966], delivery: [1], address: "8 Rue de l'Argentière 38600 Fontaine", nom_client: "célestin LECLERC" },
      { id: 10, service: 300, location: [5.728609, 45.179081], delivery: [1], address: "19 Rue des Déportés 38100 Grenoble", nom_client: "céleste LEFEBVRE" },
      { id: 11, service: 300, location: [5.693683, 45.192466], delivery: [1], address: "64 Avenue du Vercors 38600 Fontaine", nom_client: "emma LAROCHE" },
      { id: 12, service: 300, location: [5.804502, 45.233075], delivery: [1], address: "7 Domaine des Plantées 38330 Biviers", nom_client: "elisa MARCHAND" },
      { id: 13, service: 300, location: [5.827146, 45.110777], delivery: [1], address: "500 Impasse de Montperet 38410 Vaulnaveys-le-Haut", nom_client: "estelle MEYER" },
      { id: 14, service: 300, location: [5.74919, 45.232409], delivery: [1], address: "22 Chemin des Batteries 38700 La Tronche", nom_client: "soo CHO" },
      { id: 15, service: 300, location: [5.738055, 45.209762], delivery: [1], address: "2 Chemin de Noyarey 38700 La Tronche", nom_client: "hana KIM" },
      { id: 16, service: 300, location: [5.716715, 45.22624], delivery: [1], address: "371 Chemin du Replat 38950 Saint-Martin-le-Vinoux", nom_client: "julie BLANC" },
      { id: 17, service: 300, location: [5.750429, 45.22162], delivery: [1], address: "54 Chemin de Chantemerle 38700 La Tronche", nom_client: "julien DURAND" },
      { id: 18, service: 300, location: [5.751604, 45.212632], delivery: [1], address: "15 Pajon 38700 Corenc", nom_client: "julie MEYER" },
      { id: 19, service: 300, location: [5.819766, 45.158588], delivery: [1], address: "1965 Route de Gières 38410 Saint-Martin-d'Uriage", nom_client: "julie GUILLAUME" },
      { id: 20, service: 300, location: [5.819505, 45.221682], delivery: [1], address: "710 Rue Aristide Berges 38330 Montbonnot-Saint-Martin", nom_client: "juliette LEFEBVRE" }
    ],
    vehicles: [
      {
        id: 123,
        profile: "driving-car",
        start: [5.7369725, 45.1485200],
        end: [5.7369725, 45.1485200],
        capacity: [7],
        time_window: [0, 86400]
      },
      {
        id: 456,
        profile: "driving-car",
        start: [5.7369725, 45.1485200],
        end: [5.7369725, 45.1485200],
        capacity: [7],
        time_window: [0, 86400]
      },
      {
        id: 789,
        profile: "driving-car",
        start: [5.7369725, 45.1485200],
        end: [5.7369725, 45.1485200],
        capacity: [7],
        time_window: [0, 86400]
      }
    ]
  };
  
  // ========================== TOURNÉES ==========================
  
  export const tournees: Tournee[] = requeteData.vehicles.map(vehicle => ({
    vehicle,
    livreurs: livreurs.filter(l => l.vehicleId === vehicle.id)
  }));
  