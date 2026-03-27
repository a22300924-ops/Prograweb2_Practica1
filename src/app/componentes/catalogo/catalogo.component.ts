import { Component, computed, signal, inject, OnInit } from '@angular/core';
import { Producto } from '../../modelos/product.model';
import { ProductsService } from '../../servicios/productos.service';
import { CarritoService } from '../../servicios/carrito.service';
import { SearchService } from '../../servicios/search.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  private productosService = inject(ProductsService);
  private searchService = inject(SearchService);
  private carritoService = inject(CarritoService);
  
  productos: Producto[] = [];
  products = signal<Producto[]>([]);
  
  inStockCount = computed(() => this.filteredProducts().filter(p => p.inStock).length);

  filteredProducts = computed(() => {
    const searchTerm = this.searchService.searchTerm().toLowerCase().trim();
    if (!searchTerm) return this.products();
    return this.products().filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  });

  ngOnInit(): void {
    // Intentar obtener productos del backend primero
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.products.set(data);
        console.log('Productos del backend:', data);
        console.log('Total de productos cargados:', data.length);
      },
      error: (err) => {
        console.error('Error del backend, usando datos locales:', err);
        // Fallback: usar getAll() que lee del XML o datos mock
        this.productosService.getAll().subscribe({
          next: (data) => {
            this.productos = data;
            this.products.set(data);
            console.log('Productos locales (XML/Mock):', data);
            console.log('Total de productos cargados:', data.length);
          }
        });
      }
    });
  }

  agregar(producto: Producto) {
    this.carritoService.agregar(producto);
  }
}
