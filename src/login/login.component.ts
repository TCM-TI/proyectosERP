import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../app/services/user/user.service'; // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // Agrega FormsModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService) {}

  async onLogin() {
    const user = this.userService.getUserByUsername(this.username);
    if (user && this.password === 'admin') { // Aquí podrías usar una lógica más avanzada para la autenticación
      this.router.navigate(['/home']);
    } else {
      alert('Las credenciales no son correctas');
    }
  }

  onLogout() {
    alert('User logged out');
    this.router.navigate(['/login']); 
  }
}