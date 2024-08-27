import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar pipes como 'date'
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel

@Component({
  selector: 'app-content1',
  standalone: true,
  imports: [CommonModule, FormsModule], // Asegúrate de que FormsModule está aquí
  templateUrl: './content1.component.html',
  styleUrls: ['./content1.component.css']
})
export class Content1Component {
  showAddUserForm = false;
  people: Array<{ id: string, name: string, address: string, dni: string, entryDate: Date, gender: string, status: string }> = [];
  newPerson = {
    id: '',
    name: '',
    address: '',
    dni: '',
    entryDate: new Date(),
    gender: 'male',
    status: 'active'
  };

  addPerson() {
    this.people.push({ ...this.newPerson });
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