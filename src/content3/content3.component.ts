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
  branches: { id: number; name: string; address: string }[] = [];
  showForm: boolean = false; // Agregado para el control del formulario
  searchTerm: string = ''; // Agregado para el campo de búsqueda

  onSubmit() {
    if (this.branchName && this.branchAddress) {
      const newBranch = {
        id: this.branches.length + 1, // Genera un ID único basado en la longitud de la lista
        name: this.branchName,
        address: this.branchAddress
      };
      this.branches.push(newBranch);

      // Reset form fields
      this.branchId = null;
      this.branchName = '';
      this.branchAddress = '';
      this.showForm = false; // Cierra el formulario después de enviar
    } else {
      alert('Por favor complete todos los campos requeridos.');
    }
  }

  filteredBranches() {
    const term = this.searchTerm.toLowerCase();
    return this.branches.filter(branch => 
      branch.name.toLowerCase().includes(term) || 
      branch.address.toLowerCase().includes(term)
    );
  }
}