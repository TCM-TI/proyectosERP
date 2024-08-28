import { Component } from '@angular/core';
import { FooterComponent } from '../app/footer/footer.component';
import { HeaderComponent } from '../app/header/header.component';
import { SidebarComponent } from '../app/sidebar/sidebar.component';
import { ContenidoCentralComponent } from '../contenido-central/contenido-central.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent, RouterOutlet, ContenidoCentralComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
