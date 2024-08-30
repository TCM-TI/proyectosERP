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
    id: 0,
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
  people: Person[] = [];
  isEditing = false;
  editingIndex: number | null = null;

  private nextId = 3;

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe(users => this.people = users);
  }

  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
    if (!this.isPopupOpen) {
      this.resetForm();
    }
  }

  addPerson() {
    if (!this.person.username || !this.person.name || !this.person.status || this.person.group.length === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (!this.validateUsername(this.person.username)) {
      alert('El nombre de usuario no es válido.');
      return;
    }

    if (this.validateName(this.person.name)) {
      if (this.isEditing && this.editingIndex !== null) {
        // Actualizar persona existente
        const updatedPerson = { ...this.person };
        this.people[this.editingIndex] = updatedPerson; // Actualizar la persona en la lista
        this.userService.updateUser(updatedPerson); // Actualizar en el servicio
        this.isEditing = false;
        this.editingIndex = null;
      } else {
        // Agregar nueva persona
        const newPerson = { ...this.person, id: this.nextId++ };
        this.userService.addUser(newPerson); // Agregar en el servicio
        this.people.push(newPerson);
      }
      this.resetForm();
      this.togglePopup();
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  deletePerson(index: number) {
    if (index >= 0 && index < this.people.length) {
      const personId = this.people[index].id;
      this.people.splice(index, 1); // Eliminar de la lista local
      this.userService.deleteUser(personId); // Eliminar del servicio
    } else {
      alert('Índice fuera de rango.');
    }
  }

  editPerson(index: number) {
    this.person = { ...this.people[index] };
    this.editingIndex = index;
    this.isEditing = true;
    this.togglePopup();
  }

  validateUsername(username: string): boolean {
    const usernamePattern = /^[a-zA-Z0-9_]{3,}$/;
    return usernamePattern.test(username);
  }

  validateName(name: string): boolean {
    const namePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)+$/;
    const minLength = 2;
    const maxLength = 50;
    const trimmedName = name.trim();
    return (
      trimmedName.length >= minLength &&
      trimmedName.length <= maxLength &&
      namePattern.test(trimmedName)
    );
  }

  filteredPeople() {
    const lowerSearchTerm = this.searchTerm.toLowerCase();
    return this.people.filter((person: Person) =>
      (person.id.toString().includes(lowerSearchTerm) ||
      person.username.toLowerCase().includes(lowerSearchTerm) ||
      person.name.toLowerCase().includes(lowerSearchTerm)) &&
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

  resetForm() {
    this.person = { id: 0, username: '', name: '', status: 'active', group: [] };
  }
}

interface Person {
  id: number;
  username: string;
  name: string;
  status: string;
  group: string[];
}