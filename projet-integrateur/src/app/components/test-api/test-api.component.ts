import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css']
})
export class TestApiComponent implements OnInit {
  employes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/employes')
      .subscribe({
        next: (data) => {
          console.log('✅ Employés récupérés:', data);
          this.employes = data;
        },
        error: (err) => {
          console.error('❌ Erreur API :', err);
        }
      });
  }
}
