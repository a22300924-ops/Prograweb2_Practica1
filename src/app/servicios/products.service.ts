import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Product } from '../modelos/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);

  private productosMock: Product[] = [
    { id: 1, name: 'Guitarra Acústica Fender', price: 8500, description: 'Guitarra acústica de calidad profesional con cuerpo de pino', category: 'Guitarras', imageUrl: 'https://picsum.photos/seed/guitar1/400/300', inStock: true },
    { id: 2, name: 'Guitarra Eléctrica Ibanez', price: 12000, description: 'Guitarra eléctrica ideal para rock y metal con micrófono humbucker', category: 'Guitarras', imageUrl: 'https://picsum.photos/seed/guitar2/400/300', inStock: true },
    { id: 3, name: 'Cuerdas D\'Addario 10-46', price: 250, description: 'Juego de cuerdas de acero niquelado para guitarra eléctrica', category: 'Cuerdas', imageUrl: 'https://picsum.photos/seed/strings/400/300', inStock: true },
    { id: 4, name: 'Púas Dunlop Tortex', price: 80, description: 'Púas de nylon resistente, paquete de 12 piezas', category: 'Púas', imageUrl: 'https://picsum.photos/seed/puas/400/300', inStock: true },
    { id: 5, name: 'Amplificador Marshal MG30', price: 4500, description: 'Amplificador de 30 watts con efectos integrados', category: 'Amplificadores', imageUrl: 'https://picsum.photos/seed/amp/400/300', inStock: true },
    { id: 6, name: 'Correa de Cuero Levys', price: 450, description: 'Correa de cuero premium para guitarra, ajustable', category: 'Accesorios', imageUrl: 'https://picsum.photos/seed/strap/400/300', inStock: true },
    { id: 7, name: 'Afinador Electrónico Cromático', price: 350, description: 'Afinador digital con pantalla LCD y pinza', category: 'Accesorios', imageUrl: 'https://picsum.photos/seed/tuner/400/300', inStock: true },
    { id: 8, name: 'Funda para Guitarra', price: 600, description: 'Funda acolchonada con cierre y bolsillo', category: 'Fundas', imageUrl: 'https://picsum.photos/seed/case/400/300', inStock: true },
  ];

  getAll(): Observable<Product[]> {
    if (isPlatformBrowser(this.platformId)) {
      // En el navegador, intentar cargar desde XML
      return this.http.get('/productos.xml', { responseType: 'text' }).pipe(
        map((xml: string) => this.parseXml(xml)),
        // Si falla el XML, usar datos mock
        map(productos => productos.length > 0 ? productos : this.productosMock)
      );
    } else {
      // En el servidor (SSR), usar datos mock
      return of(this.productosMock);
    }
  }

  private parseXml(xml: string): Product[] {
    if (typeof DOMParser === 'undefined') {
      return this.productosMock;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    const products: Product[] = [];

    const productNodes = doc.querySelectorAll('producto');
    productNodes.forEach(node => {
      const id = parseInt(this.getElementText(node, 'id') || '0', 10);
      const name = this.getElementText(node, 'nombre') || '';
      const price = parseFloat(this.getElementText(node, 'precio') || '0');
      const description = this.getElementText(node, 'descripcion') || undefined;
      const category = this.getElementText(node, 'categoria') || '';
      const imageUrl = this.getElementText(node, 'imagen') || '';
      const inStock = this.getElementText(node, 'disponible') === 'true';

      products.push({
        id,
        name,
        price,
        description,
        category,
        imageUrl,
        inStock
      });
    });

    return products;
  }

  private getElementText(parent: Element, tagName: string): string | null {
    const element = parent.querySelector(tagName);
    return element ? element.textContent : null;
  }
}
