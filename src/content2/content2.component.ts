import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../app/services/user/user.service';

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

  searchTerm = '';
  selectedStatus = '';
  selectedGroup: string[] = [];
  isPopupOpen = false;
  people: Person[] = []; // Definir la propiedad `people`

  private nextId = 3; // ID inicial para el siguiente nuevo registro

  constructor(private userService: UserService) {}

  addPerson() {
    if (!this.person.username || !this.person.name || !this.person.status || this.person.group.length === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    if (!this.validateUsername(this.person.username)) {
      alert('El nombre de usuario no es válido.');
      return;
    }
  
    if (this.validateName(this.person.name) && this.person.username && this.person.status && this.person.group.length > 0) {
      this.person.id = this.nextId++;
      this.userService.addUser(this.person);
      this.people.push(this.person);
      this.person = { id: 0, username: '', name: '', status: 'active', group: [] };
      this.closePopup();
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  
    this.person.id = this.nextId++;
    this.userService.addUser(this.person);
    this.people.push({...this.person}); // Crear una copia del objeto para evitar referencias compartidas
    this.person = { id: 0, username: '', name: '', status: 'active', group: [] };
    this.closePopup();
  }
  
  validateUsername(username: string): boolean {
    // Ejemplo de validación: El nombre de usuario debe tener al menos 3 caracteres y no debe contener caracteres especiales
    const usernamePattern = /^[a-zA-Z0-9_]{3,}$/;
    return usernamePattern.test(username);
  }
  
  validateName(name: string): boolean {
    // Expresión regular que permite solo letras y espacios
    const namePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)+$/;
    
    // Limitar longitud del nombre
    const minLength = 2;
    const maxLength = 50;
  
    // Eliminar espacios en blanco al principio y al final
    const trimmedName = name.trim();
  
    // Verificar longitud y formato del nombre
    return (
      trimmedName.length >= minLength &&
      trimmedName.length <= maxLength &&
      namePattern.test(trimmedName)
    );
  }

  deletePerson(index: number) {
    if (index >= 0 && index < this.people.length) {
      this.people.splice(index, 1);
    } else {
      alert('Índice fuera de rango.');
    }
  }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  filteredPeople() {
    const lowerSearchTerm = this.searchTerm.toLowerCase();
    return this.people.filter((person: Person) =>
      (person.id.toString().includes(lowerSearchTerm) || // Buscar por ID
      person.username.toLowerCase().includes(lowerSearchTerm) || // Buscar por nombre de usuario
      person.name.toLowerCase().includes(lowerSearchTerm)) && // Buscar por nombre
      (this.selectedStatus ? person.status === this.selectedStatus : true) &&
      (this.selectedGroup.length > 0 ? person.group.some((role: string) => this.selectedGroup.includes(role)) : true)
    );
  }

  onGroupChange(event: any) {
    const role: string = event.target.value;
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