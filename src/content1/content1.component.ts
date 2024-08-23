import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa el CommonModule

@Component({
  selector: 'app-content1',
  standalone: true,
  imports: [CommonModule], // Asegúrate de importar CommonModule
  templateUrl: './content1.component.html',
  styleUrls: ['./content1.component.css'] // Corregido: styleUrls en plural
})
export class Content1Component {

  // Array para manejar la lista de productos
  products = [
    { name: 'Producto 1', price: '$10.00', imageUrl: 'path/to/product1.jpg' },
    // Añadir más productos si lo deseas
  ];

  // Método para agregar un nuevo producto
  addProduct() {
    const newProduct = {
      name: 'Nuevo Producto',
      price: '$20.00',
      imageUrl: 'path/to/new-product.jpg'
    };

    this.products.push(newProduct);
  }
}