import { inject, Injectable } from '@angular/core';
import { Camion, Client, Commande, Employe, Entrepot, Tournee } from '../components/models/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private http = inject(HttpClient)

  private endpoint = 'http://localhost:3000'

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.endpoint}/clients`);
  }

  public getEntrepot(): Observable<Entrepot[]>{
    return this.http.get<Entrepot[]>(`${this.endpoint}/entrepot`)
  }
  
  getClientByEmail(clientId: string): Observable<Client> {
    return this.http.get<Client>(`${this.endpoint}/clients/${clientId}`);
  }


  public getCamions(): Observable<Camion[]> {
    return this.http.get<Camion[]>(`${this.endpoint}/camions`);
  }

  public getEmployes(): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.endpoint}/employes`);
  }

  public getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.endpoint}/commandes`);
  }

  public getTournees(): Observable<Tournee[]>{
    return this.http.get<Tournee[]>(`${this.endpoint}/tournees`);
  }

  public saveTournee(tournee: Tournee) : Observable<Tournee> {
    return this.http.post<Tournee>(`${this.endpoint}/tournees`, tournee);
  }
}
