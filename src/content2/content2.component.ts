import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-content2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './content2.component.html',
  styleUrls: ['./content2.component.css']
})
export class Content2Component {
  person: Person = {
    id: 0, // Asignar un valor inicial
    username: '',
    name: '',
    status: 'active',
    group: []
  };

  roles = [
    'Administrador', 'Técnico', 'Ingeniero', 'Secretario', 'Recursos Humanos', 'Finanzas', 'Soporte', 'Ventas'
  ];

  people: Person[] = [
    { id: 1, username: 'juanperez', name: 'Juan Pérez', status: 'active', group: ['Administrador'] },
    { id: 2, username: 'anagomez', name: 'Ana Gómez', status: 'inactive', group: ['Técnico', 'Ingeniero'] }
  ];

  searchTerm = '';
  selectedStatus = '';
  selectedGroup: string[] = [];
  isPopupOpen = false;

  private nextId = 3; // ID inicial para el siguiente nuevo registro

  addPerson() {
    console.log(this.person); // Verifica los valores de los campos
    if (this.person.username && this.person.name && this.person.status && this.person.group.length > 0) {
      this.people.push({ ...this.person, id: this.nextId++ });
      this.person = { id: 0, username: '', name: '', status: 'active', group: [] }; // Limpiar formulario
      this.closePopup();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  deletePerson(index: number) {
    this.people.splice(index, 1);
  }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  filteredPeople() {
    const lowerSearchTerm = this.searchTerm.toLowerCase();
    return this.people.filter(person =>
      (person.id.toString().includes(lowerSearchTerm) || // Buscar por ID
      person.username.toLowerCase().includes(lowerSearchTerm) || // Buscar por nombre de usuario
      person.name.toLowerCase().includes(lowerSearchTerm)) && // Buscar por nombre
      (this.selectedStatus ? person.status === this.selectedStatus : true) &&
      (this.selectedGroup.length > 0 ? person.group.some(role => this.selectedGroup.includes(role)) : true)
    );
  }

  onGroupChange(event: any) {
    const role = event.target.value;
    if (event.target.checked) {
      this.person.group.push(role);
    } else {
      this.person.group = this.person.group.filter(group => group !== role);
    }
  }

  onGroupFilterChange(event: any) {
    const selectedOptions = Array.from(event.target.selectedOptions) as HTMLOptionElement[];
    this.selectedGroup = selectedOptions.map(option => option.value);
  }
}

interface Person {
  id: number;
  username: string;
  name: string;
  status: string;
  group: string[];
}