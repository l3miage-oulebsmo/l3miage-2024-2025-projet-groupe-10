import { Tournee } from '../../modeles/tournee.models';
import { statutLivraison } from '../../modeles/livraison.model';

export abstract class ProtocoleLivraison {
  abstract recupererTournee(email: string): Promise<Tournee>;
  abstract changerStatutLivraison(
    idLivraison: string,
    idTournee: string,
    statut: statutLivraison
  ): Promise<void>;
}
