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

  // Variables para búsqueda y filtros
  searchQuery = '';
  selectedGender = '';
  selectedStatus = '';
  nextId = 1; // Variable para llevar el conteo de los IDs

  constructor(private apiService: ApiService) {} // Inyecta el servicio

  ngOnInit(): void {
    this.fetchPeople(); // Cargar los datos al iniciar el componente
  }

  // Método para obtener personas desde la API
  async fetchPeople() {
    try {
      const data = await this.apiService.getData('people'); // Reemplaza 'people' con el endpoint correcto
      this.people = data;
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  }

  addPerson() {
    this.newPerson.id = this.nextId.toString();
    this.nextId++;

    const index = this.people.findIndex(person => person.id === this.newPerson.id);
    if (index !== -1) {
      this.people[index] = { ...this.newPerson };
    } else {
      this.people.push({ ...this.newPerson });
      this.savePerson(this.newPerson); // Guardar la nueva persona en la API
    }

    this.resetForm();
  }

  // Método para guardar una persona en la API
  async savePerson(person: Person) {
    try {
      await this.apiService.postData('people', person); // Reemplaza 'people' con el endpoint correcto
    } catch (error) {
      console.error('Error saving person:', error);
    }
  }

  filteredPeople() {
    return this.people.filter(person => {
      const matchesQuery = person.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesGender = this.selectedGender ? person.gender === this.selectedGender : true;
      const matchesStatus = this.selectedStatus ? person.status === this.selectedStatus : true;
      return matchesQuery && matchesGender && matchesStatus;
    });
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
}