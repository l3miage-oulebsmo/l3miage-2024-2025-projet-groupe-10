import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatError } from '@angular/material/form-field';



@Component({
  selector: 'app-loginpage',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: 'login.component.html',
  styleUrl: './login.component.scss'
})
export class loginComponent {
  loginForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Connexion réussie !', this.loginForm.value);
    } else {
      console.log('Formulaire invalide');
    }
  }

  goToPlanificateur() {
    this.router.navigate(['/planificateur']);
  }

  goToMap() {
    this.router.navigate(['/map']);
  }

  goToTournees() {
    this.router.navigate(['/tournees']);
  }

  goTotestApi() {
    this.router.navigate(['/testApi']);
  }

}
