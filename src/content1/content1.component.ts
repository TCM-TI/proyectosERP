import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Person } from '../app/models/person.model';
import { ApiService } from '../app/services/service/api.service';

@Component({
  selector: 'app-content1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './content1.component.html',
  styleUrls: ['./content1.component.css']
})
export class Content1Component implements OnInit {
  showAddUserForm = false;
  people: Person[] = [];
  newPerson: Person = {
    id: '',
    name: '',
    address: '',
    dni: '',
    entryDate: new Date(),
    gender: 'male',
    status: 'active'
  };

  searchQuery = '';
  selectedGender = '';
  selectedStatus = '';
  rowsPerPage = 5; // Número fijo de filas por página
  currentPage = 1;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchPeople();
  }

  async fetchPeople() {
    try {
      const data = await this.apiService.getData();
      this.people = data;
      this.updatePagination();
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  }

  addPerson() {
    if (this.newPerson.id) {
      this.updatePerson();
    } else {
      this.newPerson.id = (this.people.length + 1).toString(); // Generar un nuevo ID
      this.people.push({ ...this.newPerson });
      this.savePerson(this.newPerson);
    }
    this.resetForm();
  }

  async savePerson(person: Person) {
    try {
      await this.apiService.postData('', person);
    } catch (error) {
      console.error('Error saving person:', error);
    }
  }

  updatePerson() {
    const index = this.people.findIndex(person => person.id === this.newPerson.id);
    if (index !== -1) {
      this.people[index] = { ...this.newPerson };
      this.showAddUserForm = false;
    }
  }

  filteredPeople() {
    return this.people.filter(person =>
      (this.searchQuery ? person.name.includes(this.searchQuery) : true) &&
      (this.selectedGender ? person.gender === this.selectedGender : true) &&
      (this.selectedStatus ? person.status === this.selectedStatus : true)
    );
  }

  paginatedPeople() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    return this.filteredPeople().slice(start, end);
  }

  totalPages() {
    return Math.ceil(this.filteredPeople().length / this.rowsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  editPerson(person: Person) {
    this.newPerson = { ...person };
    this.showAddUserForm = true;
  }

  deletePerson(id: string) {
    this.people = this.people.filter(person => person.id !== id);
  }

  resetForm() {
    this.newPerson = {
      id: '',
      name: '',
      address: '',
      dni: '',
      entryDate: new Date(),
      gender: 'male',
      status: 'active'
    };
    this.showAddUserForm = false;
  }

  updatePagination() {
    // Si hay lógica adicional necesaria para actualizar la paginación, agrégala aquí
  }
}