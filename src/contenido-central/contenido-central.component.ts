import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app/services/service/api.service';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  selector: 'app-contenido-central',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule aquí
  templateUrl: './contenido-central.component.html',
  styleUrls: ['./contenido-central.component.css']
})
export class ContenidoCentralComponent implements OnInit {
  todo: any;
  error: string | null = null;

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    try {
      this.todo = await this.apiService.getData('todos/1'); // Endpoint específico
    } catch (e) {
      this.error = 'No se pudo cargar el dato.';
    }
  }
}