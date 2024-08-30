import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Person {
  id: number;
  username: string;
  name: string;
  status: string;
  group: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: Person[] = [
    { id: 1, username: 'admin', name: 'Administrador Principal', status: 'active', group: ['Administrador'] },
    { id: 2, username: 'jdoe', name: 'John Doe', status: 'active', group: ['Técnico'] },
    // ...otros usuarios iniciales
  ];

  getUsers(): Observable<Person[]> {
    return of(this.users);
  }

  addUser(user: Person): void {
    const existingIndex = this.users.findIndex(u => u.id === user.id);
    if (existingIndex === -1) {
      this.users.push(user); // Agregar nuevo usuario si no existe
    } else {
      this.users[existingIndex] = user; // Actualizar usuario existente
    }
  }

  updateUser(updatedUser: Person): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser; // Actualizar usuario
    }
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId); // Eliminar usuario
  }

  getUserByUsername(username: string): Person | undefined {
    return this.users.find(user => user.username === username);
  }
}