import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-content3',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './content3.component.html',
  styleUrls: ['./content3.component.css']
})
export class Content3Component {
  branchId: number | null = null;
  branchName: string = '';
  branchAddress: string = '';
  branchStatus: string = ''; // Agregado para el estado de la sucursal
  branches: { id: number; name: string; address: string; status: string }[] = [];
  showForm: boolean = false; // Controla la visibilidad del formulario
  searchTerm: string = ''; // Controla el término de búsqueda

  onSubmit() {
    if (this.branchName && this.branchAddress && this.branchStatus) {
      const newBranch = {
        id: this.branches.length + 1, // Genera un ID único basado en la longitud de la lista
        name: this.branchName,
        address: this.branchAddress,
        status: this.branchStatus // Añade el estado de la sucursal
      };
      this.branches.push(newBranch);

      // Reinicia los campos del formulario
      this.branchId = null;
      this.branchName = '';
      this.branchAddress = '';
      this.branchStatus = ''; // Reinicia el estado
      this.showForm = false; // Cierra el formulario después de enviar
    } else {
      alert('Por favor complete todos los campos requeridos.');
    }
  }

  filteredBranches() {
    const term = this.searchTerm.toLowerCase();
    return this.branches.filter(branch => 
      branch.name.toLowerCase().includes(term) || 
      branch.address.toLowerCase().includes(term) ||
      branch.status.toLowerCase().includes(term) // Añade la búsqueda por estado
    );
  }
}