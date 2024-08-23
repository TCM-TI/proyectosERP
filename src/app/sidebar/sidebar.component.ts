import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
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
