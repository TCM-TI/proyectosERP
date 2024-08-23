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
  // Cambiar el tipo de age a number
  person = {
    name: '',
    age: '',
    email: ''
  };

  people = [
    { name: 'Juan Pérez', age: 30, email: 'juan.perez@example.com' },
    { name: 'Ana Gómez', age: 25, email: 'ana.gomez@example.com' }
  ];

  addPerson() {
    // Convertir age a number antes de agregar
    if (this.person.name && this.person.age && this.person.email) {
      const ageNumber = Number(this.person.age);
      if (!isNaN(ageNumber)) {
        this.people.push({ ...this.person, age: ageNumber });
        this.person = { name: '', age: '', email: '' }; // Limpiar el formulario
      } else {
        alert('La edad debe ser un número.');
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  deletePerson(index: number) {
    this.people.splice(index, 1);
  }
}