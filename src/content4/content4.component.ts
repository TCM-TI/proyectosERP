import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar pipes como 'date'
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel

interface Server {
  name: string;
  ip: string;
  location: string;
}

@Component({
  selector: 'app-content4',
  standalone: true,
  imports: [CommonModule, FormsModule], // Asegúrate de que FormsModule está aquí
  templateUrl: './content4.component.html',
  styleUrls: ['./content4.component.css']
})
export class Content4Component {
  servers: Server[] = [];
  server: Server = { name: '', ip: '', location: '' };
  isPopupOpen = false;
  popupServer: Server = { name: '', ip: '', location: '' };
  popupTitle = 'Agregar Nuevo Servidor';
  popupAction = 'Agregar Servidor';

  // Variables para búsqueda
  searchQuery = '';

  onSubmit() {
    this.servers.push({ ...this.server });
    this.server = { name: '', ip: '', location: '' }; // Clear form
  }

  openPopup(server: Server = { name: '', ip: '', location: '' }) {
    this.popupServer = { ...server };
    this.popupTitle = server.name ? 'Editar Servidor' : 'Agregar Nuevo Servidor';
    this.popupAction = server.name ? 'Actualizar Servidor' : 'Agregar Servidor';
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  onPopupSubmit() {
    if (this.popupServer.name) {
      // Update existing server
      const index = this.servers.findIndex(s => s.name === this.popupServer.name);
      if (index > -1) {
        this.servers[index] = { ...this.popupServer };
      } else {
        // Add new server
        this.servers.push({ ...this.popupServer });
      }
    }
    this.closePopup();
  }

  // Método para filtrar servidores según búsqueda
  filteredServers() {
    return this.servers.filter(server => 
      server.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      server.ip.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      server.location.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}