import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../modelos/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Producto;
  @Output() add = new EventEmitter<Producto>();

  onAdd() {
    this.add.emit(this.product);
  }
}
