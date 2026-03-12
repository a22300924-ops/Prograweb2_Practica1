import { Component, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../servicios/carrito.service';
import { Product } from '../../modelos/product.model';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
  carrito: Signal<Product[]>;
  total = computed(() => this.carritoService.total());

  constructor(private carritoService: CarritoService) {
    this.carrito = this.carritoService.productos;
  }

  quitar(id: number) {
    this.carritoService.quitar(id);
  }

  vaciar() {
    this.carritoService.vaciar();
  }

  exportarXML() {
    this.carritoService.exportarXML();
  }
}
