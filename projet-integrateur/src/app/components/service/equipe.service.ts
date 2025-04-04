import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Equipe } from '../models/livreur.model';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  private equipesSource = new BehaviorSubject<Equipe[]>([
    { id: 1, membres: [] },
    { id: 2, membres: [] },
    { id: 3, membres: [] },
    { id: 4, membres: [] }
  ]);

  equipes$ = this.equipesSource.asObservable();

  getEquipes(): Equipe[] {
    return this.equipesSource.getValue();
  }

  updateEquipes(equipes: Equipe[]) {
    this.equipesSource.next(equipes);
  }
}
