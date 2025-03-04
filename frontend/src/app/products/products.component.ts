import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any = [];

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        this.products = res.data;
      })
      .catch(error => console.error("Error loading products", error));
  }
}
