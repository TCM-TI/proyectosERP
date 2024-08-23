import { Component } from '@angular/core';
import { FooterComponent } from '../app/footer/footer.component';
import { ContenidoCentralComponent } from '../app/contenido-central/contenido-central.component';
import { HeaderComponent} from '../app/header/header.component';
import { SidebarComponent } from '../app/sidebar/sidebar.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, ContenidoCentralComponent, HeaderComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 


}

