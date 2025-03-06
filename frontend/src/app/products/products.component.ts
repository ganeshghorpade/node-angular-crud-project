import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  imports: [CommonModule]

})
export class ProductsComponent implements OnInit {
  products: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>("http://localhost:5000/api/products")
      .subscribe({
        next: (response) => {
          this.products = response;
        },
        error: (error) => {
          console.error("Error loading products", error);
        }
      });

  }
}
