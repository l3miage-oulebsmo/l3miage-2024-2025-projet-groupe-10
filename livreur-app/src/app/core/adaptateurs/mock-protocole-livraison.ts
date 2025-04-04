import { ProtocoleLivraison } from '../../ports/protocole-livraison/protocole-livraison';
import { Tournee } from  '../../modeles/tournee.models';
import { Livraison, statutLivraison } from '../../modeles/livraison.model';

export class MockProtocoleLivraison extends ProtocoleLivraison {
  async recupererTournee(email: string): Promise<Tournee> {
    const livraisons: Livraison[] = [
      {
        id: 'LIV-001',
        client: 'Alice Dupont',
        adresseClient: '12 rue des Lilas, Paris',
        commandes: ['C001', 'C002'],
        cordonnees: [48.85, 2.35],
        statut: 'planifiee'
      }
    ];

    return {
      date: new Date(),
      refTournee: 'T-2025',
      livraisons,
      livreur: 'Kamel',
      camion: 'Camion #1',
      entrepot: 'Entrepôt Paris',
      cordoneesEntrepot: [48.85, 2.35]
    };
  }

  async changerStatutLivraison(idLivraison: string, idTournee: string, statut: statutLivraison): Promise<void> {
    console.log(`Changement du statut de ${idLivraison} → ${statut}`);
  }
}
