import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContenidoCentralComponent } from '../contenido-central/contenido-central.component';
import { Content1Component } from '../../content1/content1.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [Content1Component],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router){}
 navigateTo(path: string) {
  this.router.navigate([`/${path}`]);
}
  // Función para manejar el logout
  onLogout() {
    this.router.navigate(['/login']);
  }
  Inicio(){
    this.router.navigate(['/content1']);
  }
  Inventario(){
    this.router.navigate(['/content2']);
  }
  Personal(){
    this.router.navigate(['/content3']);
  }
  Proximo(){
    this.router.navigate(['/content4']);
  }
}
