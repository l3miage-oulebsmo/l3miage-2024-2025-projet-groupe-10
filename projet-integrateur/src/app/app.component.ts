import { Component } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    MapComponent, 
    MatButtonModule,
    MatCardModule, 
    MatToolbarModule,
    MatInputModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  latitude = 45.166672;
  longitude = 5.71667;
  zoom = 12;

  public resetMap() {
    this.latitude = 45.166672;
    this.longitude = 5.71667;
    this.zoom = 12;
  }
}
