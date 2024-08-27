import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/home']);
    } else {
      alert('Las credenciales no son correctas');
    }
  }

  onLogout() {
    // Aquí puedes manejar la lógica de cierre de sesión
    console.log('User logged out');
    // Redirige a la página de inicio o al login
    this.router.navigate(['/login']); // Asegúrate de que '/login' sea la ruta correcta
  }
}