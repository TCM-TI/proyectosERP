import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay') as HTMLElement;

    if (sidebar) {
      sidebar.classList.toggle('visible', this.isOpen);
    }

    if (overlay) {
      overlay.style.display = this.isOpen ? 'block' : 'none';
    }
  }
}