import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
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
  people: any[] = []; // Cambia el tipo a any o ajusta según la estructura de los datos
  newPerson: any = { // Cambia el tipo a any o ajusta según la estructura de los datos
    id: '',
    title: '',
    body: '',
    userId: 1
  };

  // Variables para búsqueda y filtros
  searchQuery = '';
  selectedGender = ''; // Asegúrate de definir esta propiedad
  selectedStatus = '';
  nextId = 1; // Variable para llevar el conteo de los IDs

  constructor(private apiService: ApiService) {} // Inyecta el servicio

  ngOnInit(): void {
    this.fetchPeople(); // Cargar los datos al iniciar el componente
  }

  // Método para obtener personas desde la API
  async fetchPeople() {
    try {
      const data = await this.apiService.getData('posts'); // Reemplaza 'posts' con el endpoint correcto
      this.people = data;
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  }

  addPerson() {
    this.newPerson.id = this.nextId.toString();
    this.nextId++;

    this.people.push({ ...this.newPerson });
    this.savePerson(this.newPerson); // Guardar la nueva persona en la API

    this.resetForm();
  }

  // Método para guardar una persona en la API
  async savePerson(person: any) {
    try {
      await this.apiService.postData('posts', person); // Reemplaza 'posts' con el endpoint correcto
    } catch (error) {
      console.error('Error saving person:', error);
    }
  }

  filteredPeople() {
    return this.people.filter(person => {
      const matchesQuery = person.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesGender = this.selectedGender ? person.gender === this.selectedGender : true;
      const matchesStatus = this.selectedStatus ? person.status === this.selectedStatus : true;
      return matchesQuery && matchesGender && matchesStatus;
    });
  }

  editPerson(person: any) {
    this.newPerson = { ...person };
    this.showAddUserForm = true;
  }

  deletePerson(id: string) {
    this.people = this.people.filter(person => person.id !== id);
  }

  resetForm() {
    this.newPerson = {
      id: '',
      title: '',
      body: '',
      userId: 1
    };
    this.showAddUserForm = false;
  }
}