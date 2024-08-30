import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = new BehaviorSubject<any[]>([
    { id: 1, username: 'admin', name: 'Juan Pérez', status: 'active', group: ['Administrador'] },
    { id: 2, username: 'anagomez', name: 'Ana Gómez', status: 'inactive', group: ['Técnico', 'Ingeniero'] }
  ]);

  users$ = this.users.asObservable();

  getUsers() {
    return this.users$.pipe();
  }

  addUser(user: any) {
    const currentUsers = this.users.getValue();
    this.users.next([...currentUsers, user]);
  }

  getUserByUsername(username: string) {
    const currentUsers = this.users.getValue();
    return currentUsers.find(user => user.username === username);
  }
}