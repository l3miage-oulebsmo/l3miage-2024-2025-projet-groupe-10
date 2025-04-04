import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrepot } from '../components/models/models';
@Injectable({
  providedIn: 'root'
})
export class EntrepotService {

  constructor(private http: HttpClient) {}

  //Charge les données CSV des entrepôts.
  public loadEntrepotData(): Observable<string> {
    return this.http.get('assets/Entrepot.csv', { responseType: 'text' });
  }

  /**
   * Convertit le contenu CSV en objets Entrepot.
   * @param csvData Le contenu du fichier CSV.
   */
  public parseEntrepotCsv(csvData: string): Entrepot[] {
    const lines = csvData.split('\n').filter(line => line.trim().length > 0);  
    const headers = lines[0].split(',').map(header => header.trim());

    return lines.slice(1).map(line => {
      const fields = line.split(',').map(value => value.trim());
      return this.mapCsvRowToEntrepot(headers, fields);
    }).filter(entrepot => entrepot !== null) as Entrepot[];
  }

  /**
   * Mappe une ligne CSV à un objet Entrepot.
   * @param headers Les en-têtes du CSV.
   * @param fields Les valeurs d'une ligne.
   */
  private mapCsvRowToEntrepot(headers: string[], fields: string[]): Entrepot | null {
    const entrepotObj: Partial<Entrepot> = {};

    headers.forEach((header, index) => {
      const value = fields[index] || '';

      switch (header) {
        case 'nom':
          entrepotObj.nom = value;
          break;
        case 'lettre':
          entrepotObj.lettre = value;
          break;
        case 'adresse':
          entrepotObj.adresse = value;
          break;
        case 'code postal':
          entrepotObj.codePostal = value ? parseInt(value, 10) : 0;
          break;
        case 'ville':
          entrepotObj.ville = value;
          break;
        case 'latitude':
          entrepotObj.latitude = value ? parseFloat(value) : 0;
          break;
        case 'longitude':
          entrepotObj.longitude = value ? parseFloat(value) : 0;
          break;
      }
    });

    if (
      typeof entrepotObj.latitude === 'number' &&
      typeof entrepotObj.longitude === 'number' &&
      !isNaN(entrepotObj.latitude) &&
      !isNaN(entrepotObj.longitude)
    ) {
      return entrepotObj as Entrepot;
    } else {
      console.warn('Coordonnées invalides pour l\'entrepôt:', entrepotObj);
      return null;  
    }
  }

}
