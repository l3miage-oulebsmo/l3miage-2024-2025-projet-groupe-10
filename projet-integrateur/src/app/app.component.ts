import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // <-- Ajoute ceci


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ],
  templateUrl:'./app.component.html',
  styleUrl:'./app.component.scss'
})
export class AppComponent {
  
}
